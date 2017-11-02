module Kii {
    export interface ThingIF {
        onboard(vendorId : string, password : string, ownerId : string) : Promise<OnboardResult>;
        putState(id : string, params : any) : Promise<boolean>;
    }

    export interface OnboardResult {
        thingID : string;
        accessToken : string;
        mqttEndpoint : any;
    }
}