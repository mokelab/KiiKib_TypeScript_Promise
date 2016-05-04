///<reference path="../ThingAPI.ts"/>
///<reference path="../KiiContext.ts"/>

module Kii {
    export class KiiThingAPI implements ThingAPI {
        context : KiiContext;

        constructor(context : KiiContext) {
            this.context = context;
        }

        create(id : string, password : string, info : any) : Promise<KiiThing> {
            return new Promise<KiiThing>((resolve : (t : KiiThing) => void, reject : (err : KiiError) => void) => {
                if (info == null) {
                    info = {};
                }
                info['_vendorThingID'] = id;
                info['_password'] = password;
	        var c : KiiContext = this.context;
	        var url = c.getServerUrl() + '/apps/'+ c.getAppId() + '/things';
		
	        var client : HttpClient = c.getNewClient();
	        client.setUrl(url);
	        client.setMethod('POST');
	        client.setKiiHeader(c, false);
	        client.setContentType('application/vnd.kii.ThingRegistrationAndAuthorizationRequest+json');
                
	        client.sendJson(info).then((resp : HttpResponse) => {
		    var thingId = resp.body['_thingID'];
                    var accessToken = resp.body['_accessToken'];
                    this.context.setAccessToken(accessToken);                    
                    var thing = new KiiThing(thingId);
                    thing.vendorId = id;
                    resolve(thing);
		}).catch((error : HttpError) => {
                    reject({code : error.status, message : error.message});
		});
            });
        }

        addOwner(thing : KiiThing, owner : KiiThingOwner) : Promise<boolean> {
            return new Promise<boolean>((resolve : (r : boolean) => void, reject : (err : KiiError) => void) => {
	        var c : KiiContext = this.context;
	        var url = c.getServerUrl() + '/apps/'+ c.getAppId() + '/things/' + thing.getId() + 
                    '/ownership/' + owner.getIdAsThingOwner();
		
	        var client : HttpClient = c.getNewClient();
	        client.setUrl(url);
	        client.setMethod('PUT');
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