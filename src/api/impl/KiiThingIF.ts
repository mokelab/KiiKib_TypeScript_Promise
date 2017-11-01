/// <reference path="../ThingIF.ts"/>
/// <reference path="../KiiContext.ts"/>
module Kii {
    export class KiiThingIF implements ThingIF {
        context : KiiContext;

        constructor(context : KiiContext) {
            this.context = context;
        }

        onboard(vendorId : string, password : string, ownerId : string) : Promise<OnboardResult> {
            var url = this.context.getAppPath() + "/onboardings";
            var params = {
                vendorThingID : vendorId,
                thingPassword : password,
                owner : ownerId,
            };
	        var client = this.context.getNewKiiClient(true);                
            return client.sendJson('POST', url, params)
                .then((resp : HttpResponse) => {
                    return <OnboardResult>resp.body;
                });
        }
    }
}