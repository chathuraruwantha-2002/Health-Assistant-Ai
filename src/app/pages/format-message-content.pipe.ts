// format-message-content.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'formatMessageContent',
    standalone: true
})
export class FormatMessageContentPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }

    transform(content: string): SafeHtml {
        console.log('Before formatting:', content); // Debug log
        if (content.includes('<ul>') || content.includes('<p>')) {
            return this.sanitizer.bypassSecurityTrustHtml(content);
        }
        return this.sanitizer.bypassSecurityTrustHtml(`<p class="text-base leading-relaxed text-gray-800">${content}</p>`);
    }
    
}