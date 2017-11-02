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
            client.setContentType('application/vnd.kii.onboardingWithVendorThingIDByOwner+json');              
            return client.sendJson('POST', url, params)
                .then((resp : HttpResponse) => {
                    return <OnboardResult>resp.body;
                });
        }

        putState(id : string, params : any) : Promise<boolean> {
            var url = this.context.getAppPath() + "/targets/thing:" + id + "/states";
            var client = this.context.getNewKiiClient(true);  
            client.setContentType('application/json');
            return client.sendJson('PUT', url, params)
                .then((resp : HttpResponse) => {
                    return true;
                });            
        }

        getState(id : string) : Promise<any> {
            var url = this.context.getAppPath() + "/targets/thing:" + id + "/states";
            var client = this.context.getNewKiiClient(true);  
            return client.send('GET', url)
                .then((resp : HttpResponse) => {
                    return resp.body;
                });                        
        }
    }
}