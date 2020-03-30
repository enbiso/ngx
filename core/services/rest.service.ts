import { Observable } from "rxjs"
import { HttpService, HttpOptions } from "./http.service"
import { v4 as uuid } from "uuid"

export abstract class RestService {

    constructor(protected resourceUri: string, protected http: HttpService) { }

    /**
     * Get
     * @param url full URL
     * @param opts options
     */
    _get<TResponse>(url?: string, opts?: HttpOptions): Observable<TResponse> {
        return this.http.get<TResponse>(this._url(url), this._opts(opts))
    }

    /**
     * Post
     * @param url Full URL
     * @param command Body command
     * @param opts options
     */
    _post<TResponse>(url?: string, command?: any, opts?: HttpOptions): Observable<TResponse> {
        return this.http.post<TResponse>(this._url(url), command, this._opts(opts))
    }

    /**
     * Put
     * @param url Full URL
     * @param command Body command
     * @param opts options
     */
    _put<TResponse>(url?: string, command?: any, opts?: HttpOptions): Observable<TResponse> {
        return this.http.put<TResponse>(this._url(url), command, this._opts(opts))
    }

    /**
    * Delete Resource
    * @param url Full URL
    * @param opts options
    */
    _delete<TResponse>(url?: string, opts?: HttpOptions): Observable<TResponse> {
        return this.http.delete<TResponse>(this._url(url), this._opts(opts))
    }

    /**
     * Prepare URL
     * @param url Url
     */
    private _url(url?: string): string {
        url = url || this.resourceUri
        if (!url.startsWith("http"))
            url = this.resourceUri + url
        return url
    }

    /**
     * Prepare opts
     * @param opts Options
     */
    private _opts(opts?: HttpOptions): HttpOptions {
        opts = opts || {}
        opts.headers = opts.headers || {}
        opts.headers["x-requestid"] = uuid()
        return opts
    }
}