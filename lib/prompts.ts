/**
 * YouTube Thumbnail Generation Prompt
 *
 * Based on Nano Banana (Gemini Image Generation) official documentation best practices:
 * - Be Hyper-Specific: Use precise descriptive language
 * - Provide Context and Intent: Explain purpose and desired outcome
 * - Use Step-by-Step Instructions: Break complex scenes into layers
 * - Use Semantic Negative Prompts: Describe what to avoid naturally
 * - Control the Camera: Specify angles, framing, and composition
 */

export function buildThumbnailPrompt(userPrompt: string): string {
  return `You are a professional YouTube thumbnail designer. Generate a single, high-impact YouTube thumbnail image based on the user's description below.

## Image Requirements
- Aspect ratio: 16:9 (standard YouTube thumbnail)
- Resolution: High quality, sharp and crisp
- Style: Photorealistic with cinematic color grading unless the user specifies otherwise

## Composition Guidelines
- Use the rule of thirds for subject placement
- Create a clear visual hierarchy with one dominant focal point
- If the user's description includes a title or text, render it clearly and prominently in the image
- Use shallow depth of field to separate subject from background when appropriate

## Lighting & Color
- Use dramatic, high-contrast lighting (e.g., Rembrandt lighting, rim lighting, or golden hour)
- Apply bold, saturated color palette that pops on small screens
- Ensure the thumbnail stands out against YouTube's white/dark backgrounds

## What to Avoid
- Do not include watermarks in the image
- Do not generate blurry, low-contrast, or washed-out images
- Do not create overly cluttered compositions with too many competing elements
- Do not use generic stock-photo-like compositions

## Camera & Framing
- Default to a medium close-up or close-up shot unless the scene requires a wider view
- Use a slightly low angle to make subjects appear more dynamic and powerful
- Simulate a professional camera look (e.g., 35mm lens, shallow bokeh)

## User's Description
${userPrompt.trim()}`;
}
