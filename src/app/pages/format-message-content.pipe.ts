// format-message-content.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'formatMessageContent',
  standalone: true
})
export class FormatMessageContentPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(content: string): SafeHtml {
    // If the content already contains HTML tags, return it as is
    if (content.includes('<p') || content.includes('<ul')) {
      return this.sanitizer.bypassSecurityTrustHtml(content);
    }
    
    // Otherwise, wrap it in a paragraph tag
    return this.sanitizer.bypassSecurityTrustHtml(`<p class="text-sm">${content}</p>`);
  }
}