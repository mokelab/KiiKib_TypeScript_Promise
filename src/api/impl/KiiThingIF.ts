/// <reference path="../ThingIF.ts"/>
/// <reference path="../KiiContext.ts"/>
module Kii {
    export class KiiThingIF implements ThingIF {
        context : KiiContext;

        constructor(context : KiiContext) {
            this.context = context;
        }

        onboard(vendorId : string, password : string, ownerId : string) : Promise<OnboardResult> {
            var c : KiiContext = this.context;
            
            var url = c.getServerUrl() + '/apps/'+ c.getAppId() + "/onboardings";
            var params = {
                vendorThingID : vendorId,
                thingPassword : password,
                owner : ownerId,
            };
	        var client = this.context.getNewClient();
	        client.setUrl(url);
	        client.setMethod('POST');
            client.setKiiHeader(c, true);
                
	        return client.sendJson(params).then((resp : HttpResponse) => {
                return <OnboardResult>resp.body;
            });
        }
    }
}