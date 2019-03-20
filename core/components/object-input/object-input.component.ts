import { Component, Input, ElementRef, OnDestroy, Optional, Self, HostBinding } from '@angular/core';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';
import { NgControl, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'ebs-core-object-input',
    template: `    
    <textarea autosize matInput [placeholder]="placeholder" [required]="required" [disabled]="disabled" [readonly]="readonly"
        [ngModel]="objJson" (ngModelChange)="updateObj($event)"></textarea>    
    `,
    styleUrls: ['./object-input.component.scss'],
    providers: [
        {
            provide: MatFormFieldControl,
            useExisting: ObjectInputComponent
        }
    ]
})
export class ObjectInputComponent implements MatFormFieldControl<object>, ControlValueAccessor, OnDestroy {
    static nextId = 0;

    @Input()
    get value(): object {
        return this.objJson && JSON.parse(this.objJson)
    }
    set value(val: object) {
        this.objJson = JSON.stringify(val, null, 2)
    }
    public objJson: string

    stateChanges = new Subject<void>()

    @HostBinding() id = `ebs-core-object-input-${ObjectInputComponent.nextId++}`

    focused = false
    errorState = false
    describedBy = '';

    get empty() {
        return !this.value
    }

    get shouldLabelFloat() { return this.focused || !this.empty }

    constructor(
        private fm: FocusMonitor,
        private elRef: ElementRef<HTMLElement>,
        @Optional() @Self() public ngControl: NgControl) {

        fm.monitor(elRef, true).subscribe(origin => {
            this.focused = !!origin;
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
        if ((event.target as Element).tagName.toLowerCase() != 'textarea') {
            this.elRef.nativeElement.querySelector('textarea')!.focus();
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
    get disabled(): boolean { return this._disabled; }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    private _disabled = false;

    @Input()
    get readonly(): boolean { return this._readonly; }
    set readonly(value: boolean) {
        this._readonly = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    private _readonly = false;


    writeValue(obj: any): void {
        if (obj !== undefined) this.value = obj
    }

    updateObj = (event) => { try { this.propagateChange(JSON.parse(event)) } catch { } }
    propagateChange = (_: any) => { };
    registerOnChange = (fn) => this.propagateChange = fn
    registerOnTouched = () => { }
}