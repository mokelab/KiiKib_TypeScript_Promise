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
/// <reference path="../http/HttpClient.ts" />
// <reference path="kii/jquery/JQueryClient.ts" />
var Kii;
(function (Kii) {
    class KiiContext {
        constructor(appId, appKey, url) {
            this.appId = appId;
            this.appKey = appKey;
            this.url = url;
            this.clientFactory = () => {
                return null;
                //return new jquery.JQueryClient();
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
