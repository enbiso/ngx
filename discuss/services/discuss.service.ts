import { Injectable } from '@angular/core';
import { ApiService, HttpService } from '@enbiso/core/services';
import { ResourceUri } from '@enbiso/core/utils';
import { Observable } from 'rxjs';

@Injectable()
export class DiscussService extends ApiService<string> {

    constructor(httpService: HttpService) {
        super(ResourceUri("discuss", "threads"), httpService);
    }

    listPosts(id: string): Observable<DiscussPostQueryModel[]> {
        return super.get(`${id}/posts`)
    }

    addPost(id: string, value: any) {
        return super.create(value, `${id}/posts`)
    }

    updatePost(id: string, postId: string, value: any) {
        return super.update(postId, value, `${id}/posts`)
    }

}

export class DiscussPostQueryModel {
    id: string
    content: string
    created: Date
    updated: Date
    postedBy: string
}