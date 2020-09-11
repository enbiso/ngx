import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'ebs-core-rich-editor',
    template: `         
<quill-editor [ngModel]="content" (onContentChanged)="onContentChanged($event)">
    <div quill-editor-toolbar>                  
        <span class="ql-formats">
            <select class="ql-font">
                <option selected></option>
                <option value="serif"></option>
                <option value="monospace"></option>
            </select>
            <select class="ql-size">
                <option value="small"></option>
                <option selected></option>
                <option value="large"></option>
                <option value="huge"></option>
            </select>
        </span>
        <span class="ql-formats">
            <button class="ql-bold"></button>
            <button class="ql-italic"></button>
            <button class="ql-underline"></button>
            <button class="ql-strike"></button>
        </span>
        <span class="ql-formats">
            <select class="ql-color"></select>
            <select class="ql-background"></select>
        </span>
        <span class="ql-formats">
            <button class="ql-list" value="ordered"></button>
            <button class="ql-list" value="bullet"></button>
            <select class="ql-align">
                <option selected></option>
                <option value="center"></option>
                <option value="right"></option>
                <option value="justify"></option>
            </select>
        </span>
        <span class="ql-formats">
            <button class="ql-link"></button>
            <button class="ql-image"></button>
        </span>
    </div>
</quill-editor>    
    `,
    styleUrls: ['./rich-editor.component.scss']
})

export class RichEditorComponent {
    @Input() content: string
    @Input() delay: number = 2000
    @Output() contentChange: EventEmitter<string> = new EventEmitter<string>()
    @Output() contentChangeDelayed: EventEmitter<string> = new EventEmitter<string>()

    timeout: NodeJS.Timeout

    onContentChanged({ html }) {
        this.contentChange.next(html)
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => this.contentChangeDelayed.next(html), this.delay)
    }
}