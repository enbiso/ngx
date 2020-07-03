import { Component, Input, ElementRef, OnDestroy, Optional, Self, HostBinding } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';
import { NgControl, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'ebs-core-multi-input',
    template: `    
    <mat-chip-list #chipList>
        <mat-chip *ngFor="let chip of value" 
            [selectable]="!readonly" [removable]="!readonly" (removed)="remove(chip)">
            {{chip}} <mat-icon matChipRemove *ngIf="!readonly">cancel</mat-icon>
        </mat-chip>
        <input #textbox [placeholder]="placeholder" 
            [required]="required"
            [readonly]="readonly"
            [disabled]="disabled"
            [matChipInputFor]="chipList"                        
            [matChipInputAddOnBlur]="true"
            (focus)="focused=true"
            (focusout)="focused=false"
            (matChipInputTokenEnd)="add($event)">
    </mat-chip-list>    
    `,
    providers: [
        {
            provide: MatFormFieldControl,
            useExisting: MultiInputComponent
        }
    ]
})
export class MultiInputComponent implements MatFormFieldControl<string[]>, ControlValueAccessor, OnDestroy {
    static nextId = 0;
    @Input() value: string[] = []

    stateChanges = new Subject<void>()

    @HostBinding() id = `ebs-core-multi-input-${MultiInputComponent.nextId++}`

    focused = false
    errorState = false
    describedBy = '';

    get empty() {
        return !this.value || this.value.length == 0
    }

    get shouldLabelFloat() { return this.focused || !this.empty }

    constructor(
        private fm: FocusMonitor,
        private elRef: ElementRef<HTMLElement>,
        @Optional() @Self() public ngControl: NgControl) {

        fm.monitor(elRef, true).subscribe(() => {
            this.stateChanges.next();
        });

        if (this.ngControl) {
            // Note: we provide the value accessor through here, instead of
            // the `providers` to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }
    }

    ngOnDestroy() {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elRef);
    }

    setDescribedByIds(ids: string[]) {
        this.describedBy = ids.join(' ');
    }

    onContainerClick(event: MouseEvent) {
        if ((event.target as Element).tagName.toLowerCase() != 'input') {
            this.elRef.nativeElement.querySelector('input')!.focus();
        }
    }

    @Input()
    get placeholder(): string { return this._placeholder; }
    set placeholder(value: string) {
        this._placeholder = value;
        this.stateChanges.next();
    }
    private _placeholder: string;

    @Input()
    get required(): boolean { return this._required; }
    set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    private _required = false;

    @Input()
    get readonly(): boolean { return this._readonly; }
    set readonly(value: boolean) {
        this._readonly = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    private _readonly = false;

    @Input()
    get disabled(): boolean { return this._disabled; }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    private _disabled = false;


    writeValue(obj: any): void {
        if (obj !== undefined) this.value = Object.values(obj)
    }

    propagateChange = (_: any) => { };
    registerOnChange = (fn) => this.propagateChange = fn
    registerOnTouched = () => { }

    add(event: MatChipInputEvent): void {
        const input = event.input
        const chip = event.value.trim()
        if (chip != "") {
            this.value = this.value || []
            this.value.push(chip)
            this.propagateChange(this.value)
        }
        if (input) input.value = ''
    }

    remove(chip: string): void {
        const index = this.value.indexOf(chip)
        if (index >= 0) {
            this.value.splice(index, 1)
            this.propagateChange(this.value);
        }
    }
}