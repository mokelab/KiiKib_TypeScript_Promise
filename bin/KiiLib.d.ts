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
declare module Kii {
    class KiiApp {
        getPath(): string;
    }
}
declare module Kii {
    class KiiBucket {
        owner: any;
        name: string;
        constructor(owner: any, name: string);
        getName(): string;
        getPath(): string;
    }
}
declare module Kii {
    class KiiObject {
        bucket: KiiBucket;
        id: string;
        data: any;
        constructor(bucket: KiiBucket, id: string, data: any);
        getId(): string;
        getPath(): string;
    }
}
declare module Kii {
    class KiiClause {
        clause: any;
        constructor(type: string);
        static all(): KiiClause;
        static equals(field: string, value: any): KiiClause;
        static greaterThan(field: string, value: any, include: boolean): KiiClause;
        static lessThan(field: string, value: any, include: boolean): KiiClause;
        static range(field: string, fromValue: any, fromInclude: boolean, toValue: any, toInclude: boolean): KiiClause;
        static inClause<T>(field: string, values: Array<T>): KiiClause;
        static not(clause: KiiClause): KiiClause;
        static andClause(array: Array<KiiClause>): KiiClause;
        static orClause(array: Array<KiiClause>): KiiClause;
        private static toClauses(array);
        toJson(): any;
    }
}
declare module Kii {
    class QueryParams {
        clause: KiiClause;
        orderBy: string;
        descending: boolean;
        limit: number;
        paginationKey: string;
        constructor(clause: any);
        sortByAsc(field: string): void;
        sortByDesc(field: string): void;
        setLimit(limit: number): void;
        setPaginationKey(key: string): void;
        hasNext(): boolean;
        toJson(): any;
    }
}
declare module Kii {
    interface BucketAPI {
        query(bucket: KiiBucket, params: QueryParams): Promise<QueryResult>;
    }
    interface QueryResult {
        results: Array<KiiObject>;
        params: QueryParams;
    }
}
declare module Kii {
    class KiiBucketAPI implements BucketAPI {
        context: KiiContext;
        constructor(context: KiiContext);
        query(bucket: KiiBucket, params: QueryParams): Promise<QueryResult>;
    }
}
