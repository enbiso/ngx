import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, from as fromPromise } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

/**
 * HTTP service
 */
@Injectable()
export class HttpService {
    constructor(
        private authService: AuthService,
        private http: HttpClient
    ) { }

    /**
     * POST request
     * @param resource Resource URI
     * @param data POST data
     */
    public post<M>(resource: string, data: any, opts?: HttpOptions): Observable<M> {
        return this._options(opts).pipe(mergeMap(opts => {
            return this.http.post<M>(resource, data, opts);
        }));
    }

    /**
     * PUT request
     * @param resource Resource URI
     * @param data PUT data
     */
    public put<M>(resource: string, data: any, opts?: HttpOptions): Observable<M> {
        return this._options(opts).pipe(mergeMap(opts => {
            return this.http.put<M>(resource, data, opts);
        }));
    }

    /**
     * PATCH request
     * @param resource Resource URI
     */
    public patch<M>(resource: string, data: any, opts?: HttpOptions): Observable<M> {
        return this._options(opts).pipe(mergeMap(opts => {
            return this.http.patch<M>(resource, data, opts);
        }));
    }

    /**
     * DELETE request
     * @param resource Resource URI
     */
    public delete<M>(resource: string, opts?: HttpOptions): Observable<M> {
        return this._options(opts).pipe(mergeMap(opts => {
            return this.http.delete<M>(resource, opts);
        }));
    }

    /**
     * GET request
     * @param resource ResourceURI
     * @param params URL params
     */
    public get<M>(resource: string, opts?: HttpOptions): Observable<M> {
        return this._options(opts).pipe(mergeMap(opts => {
            return this.http.get<M>(resource, opts);
        }))
    }

    /**
     * Get options based on setup opts
     * @param opts setup opts
     */
    private _options(opts: HttpOptions): Observable<HttpOptions> {
        opts = opts || {}
        return fromPromise(this.authService.authHeader())
            .pipe(map(token => {
                opts.headers = opts.headers || {}
                opts.headers["Accept"] = "application/json"
                opts.headers["Content-Type"] = "application/json"
                opts.headers["Authorization"] = token
                return opts
            }))
    }
}

export interface HttpOptions {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: any;
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
}
