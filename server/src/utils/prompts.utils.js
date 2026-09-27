export const parseGeminiJSON = (text) => {
  try {
    let cleanText = text.trim();

    // Check if wrapped in markdown code fence
    const codeFenceMatch = cleanText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (codeFenceMatch) {
      cleanText = codeFenceMatch[1].trim();
    } else {
      // Find outermost { } or [ ]
      const jsonStart = cleanText.search(/[{\[]/);
      const jsonEnd = Math.max(cleanText.lastIndexOf('}'), cleanText.lastIndexOf(']'));
      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        cleanText = cleanText.slice(jsonStart, jsonEnd + 1).trim();
      }
    }

    return JSON.parse(cleanText);
  } catch (error) {
    console.error('Failed to parse Gemini JSON response:', error.message);
    console.error('Raw text was:', text);
    throw new Error('Failed to parse AI response. The AI returned an unexpected format.');
  }
};