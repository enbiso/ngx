
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CacheContent } from './cache.model';


@Injectable()
export class CacheService {

    readonly DEFAULT_MAX_AGE: number = 300000; //5 mins in sec
    private cache: Map<string, CacheContent> = new Map<string, CacheContent>();

    /**
     * Set Cache
     * @param key Key
     * @param value Value
     * @param maxAge Age (optional)
     */
    set(key: string, value: any, maxAge: number = this.DEFAULT_MAX_AGE) {        
        this.cache.set(key, { expiry: Date.now() + maxAge, value: value });
    }

    /**
     * Set value async
     * @param key Key
     * @param value$ Value as observable
     * @param maxAge Age (optional)
     */
    setAsync(key: string, value$: Observable<any>, maxAge: number = this.DEFAULT_MAX_AGE): any {
        value$.subscribe(value => this.set(key, value, maxAge))
    }

    /**
     * Get Cache value
     * @param key Key
     */
    get(key: string): any {
        if (this.has(key)) {            
            return this.cache.get(key).value;
        }        
        return null;
    }

    /**
     * Get cache async
     * @param key Key
     */
    getAsync(key: string): Observable<any> {        
        let data = this.get(key);
        return observableOf(data);
    }

    /**
     * Check cache exists
     * @param key Key
     */
    has(key: string) {
        if (this.cache.has(key)) {
            if (this.cache.get(key).expiry < Date.now()) {
                this.cache.delete(key);
                return false;
            }
            return true;
        }
        return false;
    }
}