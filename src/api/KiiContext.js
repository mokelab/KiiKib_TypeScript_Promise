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
