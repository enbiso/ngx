import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ResourceModel, Action } from '../../models';
import { StartCasePipe } from '@enbiso/core/pipes/startcase.pipe';

@Component({
    selector: 'ebs-crud-details',
    templateUrl: './details.component.html'    
})
export class DetailsComponent implements OnChanges {

    @Input() model: ResourceModel
    @Input() data: any

    actions: Action[]
    properties: Map<string, ResourceModel>

    constructor(private startcase: StartCasePipe) { }

    ngOnChanges(_: SimpleChanges): void {
        this.properties = <Map<string, ResourceModel>>(this.model && this.model.properties)
        this.actions = this.model && this.model['x-action']
    }

    getDisplayText(propKey: string): string {
        let prop = this.getProp(propKey)
        return prop && prop['x-display'] || this.startcase.transform(propKey, [])
    }

    getProp(propKey: string): ResourceModel {
        let prop = this.model && this.model.properties && this.model.properties[propKey]
        return prop
    }

    propAvailble(m: ResourceModel): boolean {
        let ln = Object.keys(m && m.properties).length
        return ln > 0
    }
}
