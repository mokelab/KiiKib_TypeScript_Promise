var Kii;
(function (Kii) {
    class KiiUser {
        constructor(id) {
            this.id = id;
        }
        getId() {
            return this.id;
        }
        getPath() {
            return '/users/' + this.id;
        }
        getSubject() {
            return 'UserID:' + this.id;
        }
    }
    Kii.KiiUser = KiiUser;
})(Kii || (Kii = {}));
///<reference path="../model/KiiUser.ts"/>
///<reference path="./KiiError.ts"/>
/// <reference path="../api/KiiContext.ts"/>
/// <reference path="./HttpClient.ts" />
var $;
var jquery;
(function (jquery) {
    class JQueryClient {
        constructor() {
            this.headers = {};
        }
        setUrl(url) {
            this.url = url;
        }
        setMethod(method) {
            this.method = method;
        }
        setContentType(value) {
            this.setHeader('content-type', value);
        }
        setHeader(key, value) {
            this.headers[key] = value;
        }
        setKiiHeader(context, authRequired) {
            this.setHeader('x-kii-appid', context.getAppId());
            this.setHeader('x-kii-appkey', context.getAppKey());
            if (authRequired) {
                this.setHeader('authorization', 'bearer ' + context.getAccessToken());
            }
        }
        sendText(text) {
            return this.sendRequest({
                url: this.url,
                type: this.method,
                headers: this.headers,
                dataType: 'json',
                scriptCharset: 'utf-8',
                data: text,
                processData: false
            });
        }
        sendJson(json) {
            return this.sendText(JSON.stringify(json));
        }
        send() {
            return this.sendRequest({
                url: this.url,
                type: this.method,
                headers: this.headers,
                dataType: 'json',
                scriptCharset: 'utf-8',
                processData: false
            });
        }
        sendRequest(data) {
            return new Promise((resolve, reject) => {
                $.ajax(data).done((data_, status, data) => {
                    resolve(this.parseResponse(data));
                }).fail((data) => {
                    if (200 <= data.status && data.status < 300) {
                        resolve(this.parseResponse(data));
                        return;
                    }
                    var code;
                    var message;
                    try {
                        var body = JSON.parse(data.responseText);
                        code = body['errorCode'];
                        message = body['message'];
                    }
                    catch (e) {
                        code = 'UNKNOWN';
                        message = data.responseText;
                    }
                    reject({
                        status: data.status,
                        code: code,
                        message: message,
                        headers: data.getAllResponseHeaders(),
                        body: data.responseText,
                    });
                });
            });
        }
        parseResponse(data) {
            var body;
            try {
                if (data.status == 204) {
                    body = {};
                }
                else {
                    body = JSON.parse(data.responseText);
                }
            }
            catch (e) {
                body = data.responseText;
            }
            return {
                status: data.status,
                headers: data.getAllResponseHeaders(),
                body: body,
            };
        }
    }
    jquery.JQueryClient = JQueryClient;
})(jquery || (jquery = {}));
/// <reference path="../http/HttpClient.ts" />
/// <reference path="../http/JQueryClient.ts" />
var Kii;
(function (Kii) {
    class KiiContext {
        constructor(appId, appKey, url) {
            this.appId = appId;
            this.appKey = appKey;
            this.url = url;
            this.clientFactory = () => {
                return new jquery.JQueryClient();
            };
        }
        getAppId() {
            return this.appId;
        }
        getAppKey() {
            return this.appKey;
        }
        getServerUrl() {
            return this.url;
        }
        setAccessToken(value) {
            this.token = value;
        }
        getAccessToken() {
            return this.token;
        }
        setDeviceId(value) {
            this.deviceId = value;
        }
        getDeviceId() {
            return this.deviceId;
        }
        setClientFactory(factory) {
            this.clientFactory = factory;
        }
        getNewClient() {
            return this.clientFactory();
        }
    }
    Kii.KiiContext = KiiContext;
})(Kii || (Kii = {}));
///<reference path="../AppAPI.ts"/>
///<reference path="../KiiContext.ts"/>
var Kii;
(function (Kii) {
    class KiiAppAPI {
        constructor(context) {
            this.context = context;
        }
        login(userIdentifier, password) {
            return this.execLogin({
                'username': userIdentifier,
                'password': password,
            });
        }
        loginAsAdmin(clientId, clientSecret) {
            return this.execLogin({
                'client_id': clientId,
                'client_secret': clientSecret,
            });
        }
        signUp(info, password) {
            return new Promise((resolve, reject) => {
            });
        }
        execLogin(params) {
            return new Promise((resolve, reject) => {
                var c = this.context;
                var url = c.getServerUrl() + '/oauth2/token';
                var client = c.getNewClient();
                client.setUrl(url);
                client.setMethod('POST');
                client.setKiiHeader(c, false);
                client.setContentType('application/json');
                client.sendJson(params).then((resp) => {
                    var accessToken = resp.body['access_token'];
                    var id = resp.body['id'];
                    this.context.setAccessToken(accessToken);
                    resolve(new Kii.KiiUser(id));
                }).catch((error) => {
                    reject({ code: error.status, message: '' });
                });
            });
        }
    }
    Kii.KiiAppAPI = KiiAppAPI;
})(Kii || (Kii = {}));
var Kii;
(function (Kii) {
    class KiiApp {
        getPath() {
            return '';
        }
    }
    Kii.KiiApp = KiiApp;
})(Kii || (Kii = {}));
///<reference path="./KiiApp.ts"/>
var Kii;
(function (Kii) {
    class KiiBucket {
        constructor(owner, name) {
            this.owner = owner;
            this.name = name;
        }
        getName() {
            return this.name;
        }
        getPath() {
            return this.owner.getPath() + '/buckets/' + this.name;
        }
    }
    Kii.KiiBucket = KiiBucket;
})(Kii || (Kii = {}));
/// <reference path="KiiBucket.ts"/>
var Kii;
(function (Kii) {
    class KiiObject {
        constructor(bucket, id, data) {
            this.bucket = bucket;
            this.id = id;
            this.data = data;
        }
        getId() {
            return this.id;
        }
        getPath() {
            return this.bucket.getPath() +
                '/objects/' + this.id;
        }
    }
    Kii.KiiObject = KiiObject;
})(Kii || (Kii = {}));
var Kii;
(function (Kii) {
    class KiiClause {
        constructor(type) {
            this.clause = {
                'type': type
            };
        }
        static all() {
            return new KiiClause('all');
        }
        static equals(field, value) {
            var c = new KiiClause('eq');
            c.clause['field'] = field;
            c.clause['value'] = value;
            return c;
        }
        static greaterThan(field, value, include) {
            var c = new KiiClause('range');
            c.clause['field'] = field;
            c.clause['lowerLimit'] = value;
            c.clause['lowerIncluded'] = include;
            return c;
        }
        static lessThan(field, value, include) {
            var c = new KiiClause('range');
            c.clause['field'] = field;
            c.clause['upperLimit'] = value;
            c.clause['upperIncluded'] = include;
            return c;
        }
        static range(field, fromValue, fromInclude, toValue, toInclude) {
            var c = new KiiClause('range');
            c.clause['field'] = field;
            c.clause['lowerLimit'] = fromValue;
            c.clause['lowerIncluded'] = fromInclude;
            c.clause['upperLimit'] = toValue;
            c.clause['upperIncluded'] = toInclude;
            return c;
        }
        static inClause(field, values) {
            var c = new KiiClause('in');
            c.clause['field'] = field;
            c.clause['values'] = values;
            return c;
        }
        static not(clause) {
            var c = new KiiClause('not');
            c.clause['clause'] = clause.toJson();
            return c;
        }
        static andClause(array) {
            var c = new KiiClause('and');
            c.clause['clauses'] = KiiClause.toClauses(array);
            return c;
        }
        static orClause(array) {
            var c = new KiiClause('or');
            c.clause['clauses'] = KiiClause.toClauses(array);
            return c;
        }
        static toClauses(array) {
            for (var i = 0; i < array.length; ++i) {
                array[i] = array[i].toJson();
            }
            return array;
        }
        toJson() {
            return this.clause;
        }
    }
    Kii.KiiClause = KiiClause;
})(Kii || (Kii = {}));
/// <reference path="KiiClause.ts"/>
var Kii;
(function (Kii) {
    class QueryParams {
        constructor(clause) {
            this.clause = clause;
            this.orderBy = null;
            this.descending = false;
            this.paginationKey = null;
            this.limit = 0;
        }
        sortByAsc(field) {
            this.orderBy = field;
            this.descending = false;
        }
        sortByDesc(field) {
            this.orderBy = field;
            this.descending = true;
        }
        setLimit(limit) {
            this.limit = limit;
        }
        setPaginationKey(key) {
            if (typeof key == 'undefined') {
                key = null;
            }
            this.paginationKey = key;
        }
        hasNext() {
            return this.paginationKey != null;
        }
        toJson() {
            var query = {
                'clause': this.clause.toJson()
            };
            if (this.orderBy != null) {
                query['orderBy'] = this.orderBy;
                query['descending'] = this.descending;
            }
            var json = {
                'bucketQuery': query
            };
            if (this.limit > 0) {
                json['bestEffortLimit'] = this.limit;
            }
            if (this.paginationKey != null) {
                json['paginationKey'] = this.paginationKey;
            }
            return json;
        }
    }
    Kii.QueryParams = QueryParams;
})(Kii || (Kii = {}));
/// <reference path="../model/KiiBucket.ts"/>
/// <reference path="../model/KiiObject.ts"/>
/// <reference path="./QueryParams.ts"/>
/// <reference path="../BucketAPI.ts" />
/// <reference path="../KiiContext.ts" />
var Kii;
(function (Kii) {
    class KiiBucketAPI {
        constructor(context) {
            this.context = context;
        }
        query(bucket, params) {
            return new Promise((resolve, reject) => {
                var c = this.context;
                var url = c.getServerUrl() +
                    '/apps/' + c.getAppId() +
                    bucket.getPath() +
                    '/query';
                var client = c.getNewClient();
                client.setUrl(url);
                client.setMethod('POST');
                client.setKiiHeader(c, true);
                client.setContentType('application/vnd.kii.QueryRequest+json');
                var resp;
                client.sendJson(params.toJson()).then((resp) => {
                    var nextPaginationKey = resp.body['nextPaginationKey'];
                    params.setPaginationKey(nextPaginationKey);
                    var respArray = resp.body['results'];
                    var result = new Array();
                    for (var i = 0; i < respArray.length; ++i) {
                        var item = respArray[i];
                        var id = item['_id'];
                        result.push(new Kii.KiiObject(bucket, id, item));
                    }
                    ;
                    resolve({
                        results: result,
                        params: params
                    });
                }).catch((error) => {
                    reject({ code: error.status, message: '' });
                });
            });
        }
    }
    Kii.KiiBucketAPI = KiiBucketAPI;
})(Kii || (Kii = {}));