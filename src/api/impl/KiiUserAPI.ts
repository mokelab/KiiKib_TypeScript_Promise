///<reference path="../UserAPI.ts"/>
module Kii {
    export class KiiUserAPI implements UserAPI {
        context : KiiContext;

        constructor(context : KiiContext) {
            this.context = context;
        }

        findByUsername(username : string) : Promise<KiiUser> {
            var c : KiiContext = this.context;
            return this.execGetUser(c.getServerUrl() + '/apps/'+ c.getAppId() + 
                                    '/users/LOGIN_NAME:' + username);            
        }

        private execGetUser(url : string) : Promise<KiiUser> {
            return new Promise<KiiUser>((resolve : (user : KiiUser) => void, reject : (err : KiiError) => void) => {
	        var c : KiiContext = this.context;
		
	        var client : HttpClient = c.getNewClient();
	        client.setUrl(url);
	        client.setMethod('GET');
	        client.setKiiHeader(c, true);
                
	        client.send().then((resp : HttpResponse) => {
		    var id = resp.body['userID'];
                    var user = new KiiUser(id);
                    user.data = resp.body;
                    resolve(user);
		}).catch((error : HttpError) => {
                    reject({code : error.status, message : error.message});
		});
            });
        }
    }
}