import { Observable } from "rxjs"
import { HttpService } from "./http.service"
import { HttpParams } from "@angular/common/http"
import { v4 as uuid } from "uuid"

export abstract class ApiService<TKey = any, TSearch extends HttpParams = any,
    TGetResponse = any, TListReponse = any,
    TCreateCommand = any, TUpdateCommand = any,
    TCreateResponse = any, TUpdateResponse = any, TDeleteResponse = any> {

    constructor(protected resourceUri: string, protected http: HttpService) { }

    /**
     * Get single resource
     * @param id Resource Id
     * @param path Path URL postfix
     */
    get(id: TKey, path?: string): Observable<TGetResponse> {
        return this.http.get<TGetResponse>(this._resolvePath(path, id));
    }

    /**
     * List and filter resources
     * @param search Search model
     * @param path Path URL postfix
     */
    list(search?: TSearch, path?: string): Observable<TListReponse> {
        return this.http.get<TListReponse>(this._resolvePath(path), search);
    }

    /**
     * Create a new Resource
     * @param command Create Resource Command
     * @param path Path URL postfix
     */
    create(command: TCreateCommand, path?: string): Observable<TCreateResponse> {
        return this._post(this._resolvePath(path), command, {
            'x-requestid': uuid()
        });
    }

    /**
     * Post
     * @param url Full URL
     * @param command Body command
     * @param headers headers
     */
    _post<T>(url: string, command: any, headers?: any): Observable<T> {
        return this.http.post<T>(url, command, headers);
    }

    /**
     * Update an existing resource
     * @param id Resource Id
     * @param command Update Resource Command
     * @param path Path URL postfix
     */
    update(id: TKey, command: TUpdateCommand, path?: string): Observable<TUpdateResponse> {
        return this._put(this._resolvePath(path, id), command, {
            'x-requestid': uuid()
        });
    }

    /**
     * Put
     * @param url Full URL
     * @param command Body command
     * @param headers headers
     */
    _put<T>(url: string, command: any, headers?: any): Observable<T> {
        return this.http.put<T>(url, command, headers);
    }

    /**
     * Delete Resource
     * @param id Resource Id
     * @param path Path URL postfix
     */
    delete(id: TKey, path?: string): Observable<TDeleteResponse> {
        return this._delete<TDeleteResponse>(this._resolvePath(path, id), {
            'x-requestid': uuid()
        });
    }

    /**
     * Delete Resource
     * @param url Full URL
     * @param headers headers
     */
    _delete<T>(url: string, headers?: any): Observable<T> {
        return this.http.delete<T>(url, headers);
    }

    public _resolvePath = (path?: string, id?: TKey) => this.resourceUri + (path && `/${path}` || '') + (id && `/${id}` || '')
}