import { Component, Input } from '@angular/core';

@Component({
    selector: 'ebs-core-rich-viewer',
    template: `
    <quill-view [content]="content" format="text" theme="snow"></quill-view>    
    `
})

export class RichViewerComponent {
    @Input() content: string
}