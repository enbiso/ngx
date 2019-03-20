import { Pipe, PipeTransform } from '@angular/core'
@Pipe({
    name: 'populateKey'
})
export class PopulateKeyPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {        
        const row = args[0] || []
        const properties = args[1] || []
        let key = null
        for (const prop in properties) {
            if (properties.hasOwnProperty(prop)) {
                if(properties[prop]['x-key']) {
                    key = row[prop]
                }
            }
        }
        key = key || row["id"]
        value = value.replace("{key}", key)
        return value
    }
}