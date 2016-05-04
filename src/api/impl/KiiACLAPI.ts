///<reference path="../ACLAPI.ts"/>
///<reference path="../KiiContext.ts"/>

module Kii {
    export class KiiACLAPI implements ACLAPI {
        context : KiiContext;

        constructor(context : KiiContext) {
            this.context = context;
        }

        grant(target : any, verb : string, subject : any) : Promise<boolean> {
            return this.exec('PUT', target, verb, subject);
        }

        revoke(target : any, verb : string, subject : any) : Promise<boolean> {
            return this.exec('DELETE', target, verb, subject);
        }

	private exec(method : string, target : any, verb : string, subject : any) : Promise<boolean> {
            return new Promise<boolean>((resolve : (r : boolean) => void, reject : (e : KiiError) => void) => {
	        var c : KiiContext = this.context;
	        var url = c.getServerUrl() + '/apps/'+ c.getAppId() +
		target.getPath() + '/acl/' + verb + '/' + subject.getSubject();
		
	        var client : HttpClient = c.getNewClient();
	        client.setUrl(url);
	        client.setMethod(method);
	        client.setKiiHeader(c, true);

	        client.send().then((resp : HttpResponse) => {
                    resolve(true);		    
		}).catch((error : HttpError) => {
                    reject({code : error.status, message : error.message});
		});
	    });	    
	}        
    }
}