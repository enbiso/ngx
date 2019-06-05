import { Injectable } from '@angular/core';
import { ApiService, HttpService } from '@enbiso/core/services';
import { ResourceUri } from '@enbiso/core/utils';

@Injectable()
export class DiscussService extends ApiService {

    constructor(httpService: HttpService) {
        super(ResourceUri("discuss", "threads"), httpService);
    }


}