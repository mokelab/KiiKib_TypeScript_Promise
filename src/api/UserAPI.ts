/// <reference path="../model/KiiUser.ts" />

module Kii {
    export interface UserAPI {
        findByUsername(username : string) : Promise<KiiUser>;
/*
        fetchUser(id : string) : KiiUser;
	fetchUser(id : string, callback : UserCallback);

        update(user : KiiUser) : KiiUser;
	update(user : KiiUser, callback : UserCallback);

        changePassword(user : KiiUser, current : string, newPassword : string);
	changePassword(user : KiiUser, current : string, newPassword : string,
		    callback : KiiCallback);

        resetPassword(email : string);
	resetPassword(email : string, callback : KiiCallback);

        updateEmail(user : KiiUser, email : string, verified : boolean) : KiiUser;
	updateEmail(user : KiiUser, email : string, verified : boolean,
		    callback : UserCallback);

        updatePhone(user : KiiUser, phone : string, verified : boolean) : KiiUser;
	updatePhone(user : KiiUser, phone : string, verified : boolean,
		    callback : UserCallback);

        verifyPhone(user : KiiUser, code : string) : KiiUser;
	verifyPhone(user : KiiUser, code : string, callback : UserCallback);

        installDevice(user : KiiUser, os : string, token : string, development : boolean) : void;
        installDevice(user : KiiUser, os : string, token : string, development : boolean, callback : KiiCallback);

        subscribe(user : KiiUser, target : any);
	subscribe(user : KiiUser, target : any, callback : KiiCallback);

        unsubscribe(user : KiiUser, target : any);
	unsubscribe(user : KiiUser, target : any, callback : KiiCallback);
*/
    }
}