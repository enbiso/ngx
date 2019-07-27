import { Injectable } from '@angular/core';
import { ApiService, HttpService } from '@enbiso/core/services';
import { ResourceUri } from '@enbiso/core/utils';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DiscussService extends ApiService<string> {

    private postChangeSource = new Subject<DiscussPostQueryModel>();
    public postChange$ = this.postChangeSource.asObservable();

    constructor(httpService: HttpService) {
        super(ResourceUri("discuss", "threads"), httpService);
    }

    listPosts(id: string): Observable<DiscussPostQueryModel[]> {
        return super.get(`${id}/posts`)
    }

    addPost(id: string, value: DiscussPostCreate) {
        return super.create(value, `${id}/posts`).pipe(map(p => {
            this.postChangeSource.next(p)
            return p
        }))
    }

    updatePost(id: string, postId: string, value: DiscussPostCreate) {
        return super.update(postId, value, `${id}/posts`).pipe(map(p => {
            this.postChangeSource.next(p)
            return p
        }))
    }

    removePost(id: string, postId: string) {
        return super.delete(postId, `${id}/posts`).pipe(map(p => {
            this.postChangeSource.next(p)
            return p
        }))
    }

}

export class DiscussPostQueryModel {
    id: string
    content: string
    attachment: {
        uri: string
        type: string
    }
    created: Date
    updated: Date
    postedBy: string
}

export class DiscussPostCreate {
    content: string
    attachment: {
        uri: string
        type: string
    }
}