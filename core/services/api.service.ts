import { Observable } from "rxjs"
import { HttpService } from "./http.service"
import { HttpParams } from "@angular/common/http"
import { v4 as uuid } from "uuid"

export abstract class ApiService<TKey = any, TSearch extends HttpParams = any,
    TQueryModel = any, TSummeryQueryModel = any,
    TCreateCommand = any, TUpdateCommand = any,
    TCreateResponse = any, TUpdateResponse = any, TDeleteResponse = any> {

    constructor(protected resourceUri: string, protected http: HttpService) { }

    /**
     * Get single resource
     * @param id Resource Id
     * @param path Path URL postfix
     */
    get(id: TKey, path?: string): Observable<TQueryModel> {
        return this.http.get<TQueryModel>(this._path(path, id));
    }

    /**
     * List and filter resources
     * @param search Search model
     * @param path Path URL postfix
     */
    list(search?: TSearch, path?: string): Observable<TSummeryQueryModel[]> {
        return this.http.get<TSummeryQueryModel[]>(this._path(path), search);
    }

    /**
     * Create a new Resource
     * @param command Create Resource Command
     * @param path Path URL postfix
     */
    create(command: TCreateCommand, path?: string): Observable<TCreateResponse> {
        return this._post(command, path, {
            'x-requestid': uuid()
        });
    }

    /**
     * Post
     * @param command 
     * @param path 
     */
    _post(command: TCreateCommand, path?: string, headers?: any) {
        return this.http.post<TCreateResponse>(this._path(path), command, headers);
    }

    /**
     * Update an existing resource
     * @param id Resource Id
     * @param command Update Resource Command
     * @param path Path URL postfix
     */
    update(id: TKey, command: TUpdateCommand, path?: string): Observable<TUpdateResponse> {
        return this.http.put<TUpdateResponse>(this._path(path, id), command, {
            'x-requestid': uuid()
        });
    }

    /**
     * Delete Resource
     * @param id Resource Id
     * @param path Path URL postfix
     */
    delete(id: TKey, path?: string): Observable<TDeleteResponse> {
        return this.http.delete<TDeleteResponse>(this._path(path, id), {
            'x-requestid': uuid()
        });
    }

    private _path = (path?: string, id?: TKey) => this.resourceUri + (path && `/${path}` || '') + (id && `/${id}` || '')
}