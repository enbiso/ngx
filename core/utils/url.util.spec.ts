import { ResourceUri } from "./url.util";
import { environment } from "environments/environment";

describe("Url.Util", () => {
    it("#ResourceUri should return api link with service path", () => {
        environment.api.services["test"] = "testapi/"
        environment.api.server = "http://testapi.com/v1/"
        var url = ResourceUri("test", "clients");
        expect(url).toEqual("http://testapi.com/v1/testapi/clients");
    });

    it("#ResourceUri should return api link with full service path", () => {
        environment.api.services["test"] = "http://exampleapi.com/"
        var url = ResourceUri("test", "clients");
        expect(url).toEqual("http://exampleapi.com/clients");
    });
});