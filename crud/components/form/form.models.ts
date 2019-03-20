
export class Select {
    public value: string
    public display: string

    constructor(val: string , disp: string = null) {        
        this.value = val
        this.display = disp || val
    }
}