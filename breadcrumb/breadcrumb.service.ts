import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Breadcrumb } from './breadcrumb.model';
import { HyphenToCapitalizedSpace } from '@enbiso/core/utils';
import { Observable } from 'rxjs';

@Injectable()
export class BreadcrumbService {

    public observer$: Observable<Array<Breadcrumb>>

    constructor(private activatedRoute: ActivatedRoute, private router: Router) {
        this.observer$ = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .pipe(map(() => this.buildBreadCrumb(this.activatedRoute.root)));
    }

    private buildBreadCrumb(route: ActivatedRoute, url: string = '', oldBreadcrumbs: Array<Breadcrumb> = []): Array<Breadcrumb> {
        // Get path
        const path = route.routeConfig
            && route.routeConfig.path || "";
        // Fix to remove post blank routes for default module component
        if (path == "" && oldBreadcrumbs.length != 0) return oldBreadcrumbs;
        // Get label
        const label = route.routeConfig
            && route.routeConfig.data
            && route.routeConfig.data.title
            || (path != "" ? this.populatePath(path, route, true) : "Home");
        // In the routeConfig the complete path is not available,
        // so we rebuild it each time
        const nextUrl = `${url}${this.populatePath(path, route)}/`;
        const breadcrumb = {
            label: label,
            url: nextUrl
        };
        const newBreadcrumbs = [...oldBreadcrumbs, breadcrumb];
        if (route.firstChild) {
            return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
        }
        return newBreadcrumbs;
    }

    private populatePath(path: string, route: ActivatedRoute, capitalize: boolean = false): string {
        if (path.startsWith(":")) {
            let param = path.replace(":", "");
            return route.snapshot.params[param];
        } else {
            return capitalize ? HyphenToCapitalizedSpace(path) : path;
        }
    }
}