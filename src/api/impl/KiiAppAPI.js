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
