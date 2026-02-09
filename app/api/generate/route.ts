import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { GoogleGenAI } from "@google/genai";
import { buildThumbnailPrompt } from "@/lib/prompts";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(request: NextRequest) {
  try {
    // 1. Auth check
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse request
    const body = await request.json();
    const { prompt, referenceImages, model } = body as {
      prompt: string;
      referenceImages?: string[];
      model?: string;
    };

    const ALLOWED_MODELS = [
      "gemini-2.5-flash-image",
      "gemini-3-pro-image-preview",
    ];
    const selectedModel = model && ALLOWED_MODELS.includes(model)
      ? model
      : "gemini-2.5-flash-image";

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // 3. Create thumbnail record with status "generating"
    const { data: thumbnail, error: insertError } = await supabase
      .from("thumbnails")
      .insert({
        user_id: user.id,
        prompt: prompt.trim(),
        status: "generating",
      })
      .select()
      .single();

    if (insertError || !thumbnail) {
      console.error("Failed to create thumbnail record:", insertError);
      return NextResponse.json(
        { error: "Failed to create thumbnail record" },
        { status: 500 }
      );
    }

    // 4. Build Gemini request contents
    const contents: Array<{
      text?: string;
      inlineData?: { mimeType: string; data: string };
    }> = [];

    // Add reference images if provided
    if (referenceImages && referenceImages.length > 0) {
      for (const refImage of referenceImages) {
        const dataUrlMatch = refImage.match(
          /^data:(image\/\w+);base64,(.+)$/
        );
        if (dataUrlMatch) {
          contents.push({
            inlineData: {
              mimeType: dataUrlMatch[1],
              data: dataUrlMatch[2],
            },
          });
        } else if (refImage.startsWith("http")) {
          try {
            const imgRes = await fetch(refImage);
            const buffer = await imgRes.arrayBuffer();
            const base64 = Buffer.from(buffer).toString("base64");
            const contentType =
              imgRes.headers.get("content-type") || "image/png";
            contents.push({
              inlineData: { mimeType: contentType, data: base64 },
            });
          } catch (e) {
            console.error("Failed to fetch reference image:", e);
          }
        }
      }
    }

    // Add the text prompt with YouTube thumbnail context
    contents.push({
      text: buildThumbnailPrompt(prompt),
    });

    // 5. Call Gemini API
    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: [{ role: "user", parts: contents }],
      config: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    // 6. Extract image from response
    let imageBase64: string | null = null;
    let imageMimeType = "image/png";
    let responseText: string | null = null;

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageBase64 = part.inlineData.data!;
          imageMimeType = part.inlineData.mimeType || "image/png";
        } else if (part.text) {
          responseText = part.text;
        }
      }
    }

    if (!imageBase64) {
      // Update status to failed
      await supabase
        .from("thumbnails")
        .update({
          status: "failed",
          metadata: { error: "No image generated", responseText },
        })
        .eq("id", thumbnail.id);

      return NextResponse.json(
        { error: "Failed to generate image", details: responseText },
        { status: 500 }
      );
    }

    // 7. Upload image to Supabase Storage
    const extension = imageMimeType.split("/")[1] || "png";
    const storagePath = `${user.id}/${thumbnail.id}.${extension}`;
    const imageBuffer = Buffer.from(imageBase64, "base64");

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(storagePath, imageBuffer, {
        contentType: imageMimeType,
        upsert: true,
      });

    if (uploadError) {
      console.error("Failed to upload image:", uploadError);
      await supabase
        .from("thumbnails")
        .update({
          status: "failed",
          metadata: { error: "Upload failed", details: uploadError.message },
        })
        .eq("id", thumbnail.id);

      return NextResponse.json(
        { error: "Failed to upload image" },
        { status: 500 }
      );
    }

    // 8. Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("images").getPublicUrl(storagePath);

    // 9. Update thumbnail record to completed
    const { data: updatedThumbnail, error: updateError } = await supabase
      .from("thumbnails")
      .update({
        status: "completed",
        image_path: storagePath,
        metadata: { responseText, publicUrl },
      })
      .eq("id", thumbnail.id)
      .select()
      .single();

    if (updateError) {
      console.error("Failed to update thumbnail record:", updateError);
    }

    return NextResponse.json({
      thumbnail: updatedThumbnail || thumbnail,
      imageUrl: publicUrl,
    });
  } catch (error) {
    console.error("Generate API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
