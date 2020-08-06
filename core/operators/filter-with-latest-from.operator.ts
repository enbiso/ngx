import { filter, withLatestFrom, map } from "rxjs/operators";
import { Observable } from "rxjs";

export function filterWithLatestFrom(filter$: Observable<boolean>) {
    return function <T>(source$: Observable<T>): Observable<T> {
        return source$.pipe(
            withLatestFrom(filter$),
            filter(([_, filterResponse]) => filterResponse),
            map(([source, _]) => source)
        )
    }
}