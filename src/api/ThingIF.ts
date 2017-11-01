module Kii {
    export interface ThingIF {
        onboard(vendorId : string, password : string, ownerId : string) : Promise<OnboardResult>;
    }

    export interface OnboardResult {
        thingID : string;
        accessToken : string;
        mqttEndpoint : any;
    }
}