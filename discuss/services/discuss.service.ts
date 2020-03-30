import { Injectable } from '@angular/core';
import { RestService, HttpService } from '@enbiso/core/services';
import { ResourceUri } from '@enbiso/core/utils';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DiscussService extends RestService {

    private postChangeSource = new Subject<DiscussPostResponse>();
    public postChange$ = this.postChangeSource.asObservable();

    constructor(httpService: HttpService) {
        super(ResourceUri("discuss", "threads"), httpService);
    }

    listPosts(id: string): Observable<DiscussPostListQueryModel> {
        return super._get(`${id}/posts`)
    }

    addPost(id: string, value: DiscussPostCreate) {
        return super._post<DiscussPostResponse>(`${id}/posts`, value).pipe(map(p => {
            this.postChangeSource.next(p)
            return p
        }))
    }

    updatePost(id: string, postId: string, value: DiscussPostCreate) {
        return super._put<DiscussPostResponse>(`${id}/posts/${postId}`, value).pipe(map(p => {
            this.postChangeSource.next(p)
            return p
        }))
    }

    removePost(id: string, postId: string) {
        return super._delete<DiscussPostResponse>(`${id}/posts/${postId}`).pipe(map(p => {
            this.postChangeSource.next(p)
            return p
        }))
    }

}

export class DiscussPostResponse {
    id: string
    content: string
    attachment: {
        uri: string
        type: string
        name: string
    }
    created: Date
    updated: Date
    postedBy: string
}

export interface DiscussPostListQueryModel {
    records: DiscussPostResponse[]
}

export class DiscussPostCreate {
    content: string
    attachment: {
        uri: string
        type: string
        name: string
    }
}