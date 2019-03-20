import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ResourceModel, Action } from '../../models';
import { PopulateKeyPipe } from '../../pipes/populate-key.pipe';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ebs-crud-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnChanges{


    @Input() rows: any[]
    @Input() model: ResourceModel
    @Input() title: string

    actions: Action[]    
    allActions: Action[]
    properties: Map<string, ResourceModel>

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private populateKeyPipe: PopulateKeyPipe) {
    }

    ngOnChanges(_: SimpleChanges): void {
        this.allActions = this.model && this.model["x-action"] && this.model["x-action"]
        this.actions = this.allActions && this.allActions.filter(action => action.type !== 'details' && action.type !== 'create')        
    }

    onActivate(event) {
        if (event.type == "click")
            this.onActivateClick(event);
    }    

    onActivateClick(event) {
        let action = this.allActions && this.allActions.find(action => action.type === 'details')
        if (action) {
            let link = this.populateKeyPipe.transform(action.link, event.row, this.model && this.model.properties);
            this.router.navigate([link], { relativeTo: this.activatedRoute });
        }
    }
}
