import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core'
import { ResourceModel } from '@enbiso/crud/models'
import { FormGroup, FormControl } from '@angular/forms'
import { StartCasePipe } from '@enbiso/core/pipes/startcase.pipe';
import { Select } from './form.models';

@Component({
    selector: 'ebs-crud-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnChanges {

    @Input() model: ResourceModel
    @Input() data: any
    @Input() selects: { [prop: string]: Select[] } = {}
    @Output() formSubmit = new EventEmitter<any>()

    arrData: string[][] = []

    form: FormGroup = new FormGroup({})
    properties: Map<string, ResourceModel>

    constructor(private startcase: StartCasePipe) { }

    ngOnChanges(_: SimpleChanges): void {
        this.form = new FormGroup({})
        for (let key in this.model && this.model.properties) {
            let data = this.data && this.data[key]
            this.form.addControl(key, new FormControl(data))
        }
    }

    isObject = (val: any): boolean => val != null && typeof val == 'object'

    isReadOnly(propKey: string): boolean {
        let prop = this.getProp(propKey)
        return prop['x-key'] && this.data && this.data[propKey]
    }

    getDisplayText(propKey: string): string {
        let prop = this.getProp(propKey)
        return prop && prop['x-display'] || this.startcase.transform(propKey, [])
    }

    getFieldType(propKey: string): string {
        if (this.getSelect(propKey))
            return "select"
        let prop = this.getProp(propKey)
        return prop && prop.type
    }

    getProp(propKey: string): ResourceModel {
        let prop = this.model && this.model.properties && this.model.properties[propKey]
        return prop;
    }

    getSelect(propKey: string): Select[] {
        return this.selects[propKey]
    }

    onSubmit = () => {
        if (this.form.valid) {
            this.formSubmit.emit(this.form.value)
        }
    }
}
