import { Component } from '@angular/core';
import { GeminiService } from '../../services/gemini.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormatMessageContentPipe } from '../format-message-content.pipe';

@Component({
  selector: 'app-healthcare-chat',
  templateUrl: './healthcare-chat.component.html',
  styleUrls: ['./healthcare-chat.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule,FormatMessageContentPipe]
})
export class HealthcareChatComponent {
  userMessage = '';
  chatHistory: {role: 'user' | 'ai', content: string}[] = [
    {role: 'ai', content: 'Hello! I\'m MediGo your Healthcare Assistant. How can I help you today?'}
  ];
  isTyping = false;

  constructor(private geminiService: GeminiService) {}

  async sendMessage() {
    if (this.userMessage.trim() !== '') {
      // Add user message to chat history
      this.chatHistory.push({role: 'user', content: this.userMessage});
      
      // Clear input and show typing indicator
      const userInput = this.userMessage;
      this.userMessage = '';
      this.isTyping = true;
      
      try {
        // Get response from Gemini
        const response = await this.geminiService.generateResponse(userInput);
        
        // Hide typing indicator and add AI response
        this.isTyping = false;
        this.chatHistory.push({role: 'ai', content: response});
      } catch (error) {
        // Handle error
        this.isTyping = false;
        this.chatHistory.push({role: 'ai', content: 'Sorry, I encountered an error. Please try again.'});
        console.error('Error generating response:', error);
      }
    }
  }

  startNewChat() {
    this.chatHistory = [
      {role: 'ai', content: 'Hello! I\'m MediGo, your Healthcare Assistant. How can I help you today?'}
    ];
  }
}