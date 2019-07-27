import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ebs-spinner',
    template: `
<div class="loading-indicator">
    <mat-progress-spinner mode="indeterminate" color="accent"></mat-progress-spinner>
</div>
    `,
    styles: [
        `
.loading-indicator {
    position: relative;
    z-index: 999;
    height: 6em;
    width: 2em;
    overflow: show;
    margin: 40px auto;
  }`
    ]
})

export class SpinnerComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}