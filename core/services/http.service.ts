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
    public post<M>(resource: string, data: any, headers?: { [name: string]: string }): Observable<M> {
        return this._options(headers).pipe(mergeMap(opts => {
            return this.http.post<M>(resource, data, opts);
        }));
    }

    /**
     * PUT request
     * @param resource Resource URI
     * @param data PUT data
     */
    public put<M>(resource: string, data: any, headers?: { [name: string]: string }): Observable<M> {
        return this._options(headers).pipe(mergeMap(opts => {
            return this.http.put<M>(resource, data, opts);
        }));
    }

    /**
     * PATCH request
     * @param resource Resource URI
     */
    public patch<M>(resource: string, data: any, headers?: { [name: string]: string }): Observable<M> {
        return this._options(headers).pipe(mergeMap(opts => {
            return this.http.patch<M>(resource, data, opts);
        }));
    }

    /**
     * DELETE request
     * @param resource Resource URI
     */
    public delete<M>(resource: string, headers?: { [name: string]: string }): Observable<M> {
        return this._options(headers).pipe(mergeMap(opts => {
            return this.http.delete<M>(resource, opts);
        }));
    }

    /**
     * GET request
     * @param resource ResourceURI
     * @param params URL params
     */
    public get<M>(resource: string, params?: HttpParams, headers?: { [name: string]: string }): Observable<M> {
        return this._options(headers, params).pipe(mergeMap(opts => {
            return this.http.get<M>(resource, opts);
        }))
    }

    /**
     * Get options based on http parameters
     * @param params HTTP parameters
     */
    private _options(headers?: { [name: string]: string }, params?: HttpParams): Observable<Object> {
        return this._headers(headers).pipe(map(headers => new Object({ headers: headers, params: params })));
    }

    /**
     * Get HTTP headers with auth token
     */
    private _headers(headers?: { [name: string]: string }): Observable<HttpHeaders> {
        var token = fromPromise(this.authService.authHeader());
        return token.pipe(map(token => new HttpHeaders(headers)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("Authorization", token)
        ));
    }
}
