
export class ResourceModel {
    type: string
    properties: Map<string, ResourceModel>
}
export interface Action {
    type: string
    display: string
    link: string
}