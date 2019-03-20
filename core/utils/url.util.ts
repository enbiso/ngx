import { environment } from 'environments/environment';
/**
 * Get the Base URI
 */
export function BaseUri() {
    return location.protocol + '//' + location.host;
}
/**
 * get the absolute URI of the given path
 * @param path 
 */
export function AbsoluteUri(path: string) {
    return BaseUri() + '/' + path
}
/**
 * Get resource URL
 * @param serviceName Service name
 * @param resourceName Resource name
 */
export function ResourceUri(serviceName, resourceName) {
    let service = ServiceUri(serviceName);
    return service + resourceName;    
}
/**
 * Get service URL
 * @param serviceName Service name
 */
export function ServiceUri(serviceName) {
    let service = environment.api.services[serviceName] as string;
    if(!service) throw `Service ${serviceName} not defined in environment`;    
    return (service.startsWith("http") ? service : environment.api.server + service); 
}