import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { ResourceModel } from '../models';
import { ServiceUri } from '@enbiso/core/utils';
import { CacheService } from '../../cache/cache.service';

@Injectable()
export class SwaggerService {
    constructor(
        private httpClient: HttpClient,
        private cacheService: CacheService) { }

    /**
     * Get resource model
     * @param service Service Name
     * @param name Model Name
     */
    getResourceModel(service: string, name: string) : Observable<ResourceModel> {
        return this.fetchSwagger(service).pipe(
            map(doc => {
                let model = <ResourceModel>doc["definitions"][name]
                for (const key in model.properties) {
                    if (model.properties.hasOwnProperty(key) && model.properties[key].hasOwnProperty("$ref")) {
                        let refName = (<string>model.properties[key]['$ref']).replace("#/definitions/", "")
                        model.properties[key] = <ResourceModel>doc["definitions"][refName]
                    }                    
                }
                return model;
            })
        ).pipe(share());
    }

    private fetchSwagger(service: string): Observable<any> {
        let key = "swagger-" + service;
        if(this.cacheService.has(key)){
            return this.cacheService.getAsync(key);
        } else {
            var swagger$ = this.httpClient.get(ServiceUri(service) + "swagger.json");
            this.cacheService.setAsync(key, swagger$)
            return swagger$;
        }
    }
}
