///<reference path="../ServerAPI.ts"/>
module Kii {
    export class KiiServerAPI implements ServerAPI {
        context : KiiContext;

        constructor(context : KiiContext) {
            this.context = context;
        }

        execute(api : string, params : any) : Promise<ServerAPIResponse> {
            return new Promise<ServerAPIResponse>((resolve : (resp : ServerAPIResponse) => void, reject : (err : KiiError) => void) => {
	        var c : KiiContext = this.context;
                var url = c.getServerUrl() + '/apps/'+ c.getAppId() + 
                    '/server-code/versions/current/' + api;
		
	        var client : HttpClient = c.getNewClient();
	        client.setUrl(url);
	        client.setMethod('POST');
	        client.setKiiHeader(c, true);                
                client.setContentType('application/json');
                
	        client.sendJson(params).then((resp : HttpResponse) => {
                    resolve(resp.body);
		}).catch((error : HttpError) => {
                    reject({code : error.status, message : error.message});
		});                
            });
        }
    }
}