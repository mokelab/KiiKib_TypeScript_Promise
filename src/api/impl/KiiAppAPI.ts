///<reference path="../AppAPI.ts"/>
///<reference path="../KiiContext.ts"/>

module Kii {
    export class KiiAppAPI implements AppAPI {
        context : KiiContext;

        constructor(context : KiiContext) {
            this.context = context;
        }

        login(userIdentifier : string, password : string) : Promise<KiiUser> {
            return this.execLogin({
                'username' : userIdentifier,
                'password' : password,
            });
        }

        loginAsAdmin(clientId : string, clientSecret : string) : Promise<KiiUser> {
            return this.execLogin({
                'client_id' : clientId,
                'client_secret' : clientSecret,
            });
        }

        signUp(info : any, password : string) : Promise<KiiUser> {
            return new Promise<KiiUser>((resolve : (user : KiiUser) => void, reject : (err : KiiError) => void) => {
            });
        }

        private execLogin(params : any) : Promise<KiiUser> {
            return new Promise<KiiUser>((resolve : (user : KiiUser) => void, reject : (err : KiiError) => void) => {
                var c : KiiContext = this.context;
                var url = c.getServerUrl() + '/oauth2/token';

                var client : HttpClient = c.getNewClient();
                client.setUrl(url);
                client.setMethod('POST');
                client.setKiiHeader(c, false);
                client.setContentType('application/json');

                client.sendJson(params).then((resp : HttpResponse) => {
                    var accessToken = resp.body['access_token'];
                    var id = resp.body['id'];
                    this.context.setAccessToken(accessToken);
                    resolve(new KiiUser(id));
                }).catch((error : HttpError) => {
                    reject({code : error.status, message : ''});
                });
            });
        }
    }
}