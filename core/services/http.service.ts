import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, from as fromPromise, throwError } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Injectable, Injector, InjectionToken } from '@angular/core';
import { AuthService } from '@enbiso/auth/services';

/**
 * Core HTTP error handler
 */
export interface CoreHttpErrorHandler {
    handle(err: HttpErrorResponse)
}

/**
 * Core HTTP error handler token
 */
export const CORE_HTTP_ERROR_HANDLER = new InjectionToken<CoreHttpErrorHandler[]>('CORE_HTTP_ERROR_HANDLER')

/**
 * HTTP service
 */
@Injectable({ providedIn: "root" })
export class HttpService {
    errorHandlers: CoreHttpErrorHandler[]
    constructor(
        private authService: AuthService,
        private http: HttpClient,
        injector: Injector
    ) {
        this.errorHandlers = injector.get(CORE_HTTP_ERROR_HANDLER, [])
    }

    /**
     * POST request
     * @param resource Resource URI
     * @param data POST data
     */
    public post<M>(resource: string, data: any, opts?: HttpOptions): Observable<M> {
        return this._options(opts).pipe(mergeMap(opts =>
            this.http.post<M>(resource, data, opts)
                .pipe(catchError((err: HttpErrorResponse) => {
                    if (err.status == 401) {
                        console.log(err)
                    }
                    return throwError(err)
                }))
                .pipe(catchError(err => this._errorHandler(err)))))
    }

    /**
     * PUT request
     * @param resource Resource URI
     * @param data PUT data
     */
    public put<M>(resource: string, data: any, opts?: HttpOptions): Observable<M> {
        return this._options(opts).pipe(mergeMap(opts =>
            this.http.put<M>(resource, data, opts)
                .pipe(catchError((err: HttpErrorResponse) => {
                    if (err.status == 401) {
                        console.log(err)
                    }
                    return throwError(err)
                }))
                .pipe(catchError(err => this._errorHandler(err)))))
    }

    /**
     * PATCH request
     * @param resource Resource URI
     */
    public patch<M>(resource: string, data: any, opts?: HttpOptions): Observable<M> {
        return this._options(opts).pipe(mergeMap(opts =>
            this.http.patch<M>(resource, data, opts)
                .pipe(catchError((err: HttpErrorResponse) => {
                    if (err.status == 401) {
                        console.log(err)
                    }
                    return throwError(err)
                }))
                .pipe(catchError(err => this._errorHandler(err)))))
    }

    /**
     * DELETE request
     * @param resource Resource URI
     */
    public delete<M>(resource: string, opts?: HttpOptions): Observable<M> {
        return this._options(opts).pipe(mergeMap(opts =>
            this.http.delete<M>(resource, opts)
                .pipe(catchError((err: HttpErrorResponse) => {
                    if (err.status == 401) {
                        console.log(err)
                    }
                    return throwError(err)
                }))
                .pipe(catchError(err => this._errorHandler(err)))))
    }

    /**
     * GET request
     * @param resource ResourceURI
     * @param params URL params
     */
    public get<M>(resource: string, opts?: HttpOptions): Observable<M> {
        return this._options(opts).pipe(mergeMap(opts =>
            this.http.get<M>(resource, opts)
                .pipe(catchError((err: HttpErrorResponse) => {
                    if (err.status == 401) {
                        console.log(err)
                    }
                    return throwError(err)
                }))
                .pipe(catchError(err => this._errorHandler(err)))))
    }

    /**
     * 
     * @param err Http
     */
    _errorHandler(err: HttpErrorResponse): Observable<never> {
        this.errorHandlers && this.errorHandlers.map(h => h.handle(err))
        return throwError(err)
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
                opts.headers["Accept"] = opts.headers["Accept"] || "application/json"
                opts.headers["Content-Type"] = opts.headers["Content-Type"] || "application/json"
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
