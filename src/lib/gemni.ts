interface GeminiResponse {
    candidates: {
      content: {
        parts: {
          text: string;
        }[];
      };
    }[];
  }
  
  // Local Fallback Responses
  const fallbackResponses: Record<string, string> = {
    "hello": "Hello! How can I help you regarding property in Pakistan?",
    "hi": "Hi there! Feel free to ask anything about property buying, selling, or renting.",
    "rent": "Rental agreements in Pakistan usually require a 2-month security deposit and one month in advance.",
    "property rates": "Rates vary by area. For example, F-6 and F-7 in Islamabad are premium, while G-13 and I-8 are affordable.",
    "investment": "Popular investment areas include DHA Phase 2, B-17, and Bahria Town.",
    "mortgage": "Most banks offer mortgages up to 70% of the property value with varying interest rates.",
    "legal": "Verify property documents through CDA or the respective housing authority before purchasing.",
    "agent": "Make sure your property agent is registered with a reputable agency or housing society.",
    "tax": "Buying or selling property involves capital gains tax and stamp duties in Pakistan.",
  };
  
  // Fallback Keyword Matcher
  const generateLocalResponse = (message: string, responses: Record<string, string>): string => {
    const msg = message.toLowerCase();
  
    for (const keyword in responses) {
      if (msg.includes(keyword)) {
        return responses[keyword];
      }
    }
  
    return "I'm here to help with property queries in Pakistan. Please ask a specific question.";
  };
  
  // System Prompt for Gemini
  const SYSTEM_PROMPT = `
  You are a professional property assistant for a real estate company in Pakistan.
  Provide helpful, concise, and accurate information about real estate topics including:
  - Property buying and selling processes
  - Rental procedures and advice
  - Investment opportunities in different areas
  - Current property rates in various location 
  - Market trends and forecasts
  - Legal requirements for property transactions
  - Financing options and mortgage advice
  
  Always be polite, professional, and provide factual information. If you don't know something specific, 
  acknowledge it and provide general guidance instead.
  Reply should be short and concise. Greeting message should be short and accurate.
  Just answer the user accordingly, don't add extra sentences. Professionalism is important.
  `;
  
  // Main AI Response Function
  export const askGemini = async (userMessage: string): Promise<string> => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("Gemini API key is missing");
  
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  { text: SYSTEM_PROMPT },
                  { text: userMessage }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500,
            },
          }),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Gemini API Error:', errorData);
        throw new Error(errorData.error?.message || 'Unknown error');
      }
  
      const data: GeminiResponse = await response.json();
  
      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error("No valid response from Gemini");
      }
  
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.warn("Gemini failed, using local fallback:", error);
      return generateLocalResponse(userMessage, fallbackResponses);
    }
  };
  