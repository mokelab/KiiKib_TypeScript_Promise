///<reference path="../model/KiiUser.ts"/>
///<reference path="../model/KiiThing.ts"/>
///<reference path="./KiiError.ts"/>
module Kii {
    export interface AppAPI {
        login(userIdentifier : string, password : string) : Promise<KiiUser>;
/*
        loginWithLocalPhone(phone : string, country : string, password : string) : KiiUser;        
        loginWithLocalPhone(phone : string, country : string, password : string, callback : UserCallback);
*/

        loginAsAdmin(clientId : string, clientSecret : string) : Promise<KiiUser>;

        loginAsThing(vendorThingId : string, password : string) : Promise<KiiThing>;
        signUp(info : any, password : string) : Promise<KiiUser>;
/*
        deleteUser(user : KiiUser);
	deleteUser(user : KiiUser, callback : KiiCallback);

        sendEvent(event : KiiEvent);
	sendEvent(event : KiiEvent, callback : KiiCallback);

        // APIs
        userAPI() : UserAPI;
        groupAPI() : GroupAPI;
        bucketAPI() : BucketAPI;
        objectAPI() : ObjectAPI;
        aclAPI() : ACLAPI;
        topicAPI() : TopicAPI;  
*/
    }
}