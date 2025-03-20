import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from "@google/generative-ai";

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private chatSession: any;

  constructor() {
    const API_KEY = 'AIzaSyAP9xlgCkQArWXGWOGQGTaEUyIWOHEsgRM';  // Replace with a valid API Key
    this.genAI = new GoogleGenerativeAI(API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Correct model version
    this.initChatSession();
  }

  private initChatSession() {
    this.chatSession = this.model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "You are a helpful healthcare assistant. You provide medical information and advice. Keep responses concise and helpful." }]
        },
        {
          role: "model",
          parts: [{ text: "I'll act as a healthcare assistant providing concise medical information and advice. How can I help you today?" }]
        }
      ],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent({ contents: [{ role: "user", parts: [{ text: prompt }] }] });
      return result.response.text();  
    } catch (error) {
      console.error('Error generating content:', error);
      return 'Error: Unable to generate response';
    } 
  }

  // Helper method to format the response
  private formatResponse(text: string): string {
    // Handle markdown-like formatting
    // Replace bullet points with proper HTML
    let formatted = text.replace(/^- (.*)$/gm, '<li>$1</li>');
    formatted = formatted.replace(/\n\n/g, '<br><br>');
    
    // Wrap lists in <ul> tags
    if (formatted.includes('<li>')) {
      formatted = formatted.replace(/<li>(.*?)<\/li>/g, (match) => {
        return '<ul class="text-sm list-disc pl-5 space-y-1">' + match + '</ul>';
      });
    }
    
    // Wrap paragraphs in <p> tags
    const paragraphs = formatted.split('<br><br>');
    formatted = paragraphs.map(p => {
      if (!p.includes('<ul>') && p.trim().length > 0) {
        return `<p class="text-sm">${p}</p>`;
      }
      return p;
    }).join('');
    
    return formatted;
  }

  // Method to reset the chat session
  resetChatSession() {
    this.initChatSession();
  }
}

