import { Injectable } from '@angular/core';
import { ApiService, HttpService } from '@enbiso/core/services';
import { ResourceUri } from '@enbiso/core/utils';
import { Observable, of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StorageService extends ApiService<string> {

    constructor(httpService: HttpService,
        private httpClient: HttpClient) {
        super(ResourceUri("storage", "files"), httpService);
    }

    /**
     * Fetch download URL
     * @param resourceLocator Application Name
     */
    public downloadUrl(resourceLocator: string): Observable<string> {
        resourceLocator = resourceLocator.replace('ebs-storage://', "")
        return this.get(`${resourceLocator}/download`)
    }

    /**
     * Fetch upload URL
     * @param app Application Name
     * @param bucket Bucket Name
     * @param obj Object Path
     */
    public uploadUrl(app: string, bucket: string, obj: string): Observable<string> {
        return this.get(`${app}/${bucket}/${obj}/upload`)
    }

    /**
     * Upload file
     * @param app Application Name
     * @param bucket Bucket Name
     * @param obj Object Path
     * @param file File to be uploaded
     * @returns Storage resource locator
     */
    public upload(app: string, bucket: string, obj: string, file: File): Observable<string> {
        return this.uploadUrl(app, bucket, obj)
            .pipe(mergeMap(path => this.httpClient.put(path, file)))
            .pipe(map(_ => `ebs-storage://${app}/${bucket}/${file.name}`))
    }
}

