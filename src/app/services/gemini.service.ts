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
      let formattedResponse = this.formatResponse(result.response.text());
      return formattedResponse;
    } catch (error) {
      console.error('Error generating content:', error);
      return 'Error: Unable to generate response';
    }
  }

  // Helper method to format the response
  private formatResponse(text: string): string {
    // Bold formatting (handling markdown-style: **bold**)
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-lg">$1</strong>'); // **bold** becomes <strong>bold</strong>

    // Italic formatting (handling markdown-style: *italic*)
    formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>'); // *italic* becomes <em>italic</em>

    // Underline formatting (handling markdown-style: __underline__)
    formatted = formatted.replace(/__(.*?)__/g, '<u class="underline">$1</u>'); // __underline__ becomes <u>underline</u>

    // Strikethrough formatting (handling markdown-style: ~~strikethrough~~)
    formatted = formatted.replace(/~~(.*?)~~/g, '<del class="line-through">$1</del>'); // ~~strikethrough~~ becomes <del>strikethrough</del>

    // Handle bullet points (markdown-style: - list item)
    formatted = formatted.replace(/^- (.*)$/gm, '<li class="text-sm pl-5">• $1</li>');
    formatted = formatted.replace(/\n\n/g, '<br><br>'); // Preserve paragraphs with <br><br>

    // Wrap lists in <ul> tags
    if (formatted.includes('<li>')) {
      formatted = `<ul class="list-inside list-disc space-y-1 text-sm">${formatted}</ul>`;
    }

    // Wrap paragraphs in <p> tags with added styling
    const paragraphs = formatted.split('<br><br>');
    formatted = paragraphs.map(p => {
      if (!p.includes('<ul>') && p.trim().length > 0) {
        return `<p class="text-base leading-relaxed text-gray-800">${p}</p>`;
      }
      return p;
    }).join('');

    // Optional: Add a blockquote for important notes (markdown-style: > important)
    formatted = formatted.replace(/^> (.*?)$/gm, '<blockquote class="bg-yellow-100 border-l-4 border-yellow-500 pl-4 text-gray-700 italic">$1</blockquote>');

    return formatted;
  }


  // Method to reset the chat session
  resetChatSession() {
    this.initChatSession();
  }
}

