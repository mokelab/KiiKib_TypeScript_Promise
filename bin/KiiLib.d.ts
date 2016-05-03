declare module Kii {
    class KiiUser {
        id: string;
        data: any;
        constructor(id: string);
        getId(): string;
        getPath(): string;
        getSubject(): string;
    }
}
declare module Kii {
    interface KiiError {
        code: number;
        message: string;
    }
}
declare module Kii {
    interface AppAPI {
        login(userIdentifier: string, password: string): Promise<KiiUser>;
        loginAsAdmin(clientId: string, clientSecret: string): Promise<KiiUser>;
        signUp(info: any, password: string): Promise<KiiUser>;
    }
}
declare module Kii {
    interface HttpClient {
        setUrl(url: string): any;
        setMethod(method: string): any;
        setContentType(value: string): any;
        setHeader(key: string, value: string): any;
        setKiiHeader(context: KiiContext, authRequired: boolean): any;
        sendText(text: string): Promise<HttpResponse>;
        sendJson(json: any): Promise<HttpResponse>;
        send(): Promise<HttpResponse>;
    }
    interface HttpResponse {
        status: number;
        headers: any;
        body: any;
    }
    interface HttpError {
        status: number;
        code: string;
        desc: string;
        headers: any;
        body: any;
    }
}
declare var $: any;
declare module jquery {
    class JQueryClient implements Kii.HttpClient {
        private url;
        private method;
        private headers;
        constructor();
        setUrl(url: string): void;
        setMethod(method: string): void;
        setContentType(value: string): void;
        setHeader(key: string, value: string): void;
        setKiiHeader(context: Kii.KiiContext, authRequired: boolean): void;
        sendText(text: string): Promise<Kii.HttpResponse>;
        sendJson(json: any): Promise<Kii.HttpResponse>;
        send(): Promise<Kii.HttpResponse>;
        private sendRequest(data);
    }
}
declare module Kii {
    class KiiContext {
        appId: string;
        appKey: string;
        url: string;
        token: string;
        deviceId: string;
        clientFactory: () => HttpClient;
        constructor(appId: string, appKey: string, url: string);
        getAppId(): string;
        getAppKey(): string;
        getServerUrl(): string;
        setAccessToken(value: string): void;
        getAccessToken(): string;
        setDeviceId(value: string): void;
        getDeviceId(): string;
        setClientFactory(factory: () => HttpClient): void;
        getNewClient(): HttpClient;
    }
}
declare module Kii {
    class KiiAppAPI implements AppAPI {
        context: KiiContext;
        constructor(context: KiiContext);
        login(userIdentifier: string, password: string): Promise<KiiUser>;
        loginAsAdmin(clientId: string, clientSecret: string): Promise<KiiUser>;
        signUp(info: any, password: string): Promise<KiiUser>;
        private execLogin(params);
    }
}
