import { filter } from 'rxjs/operators'

export function filterNil() {
    return filter(value => value !== undefined && value !== null)
}