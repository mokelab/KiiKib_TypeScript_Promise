///<reference path="../model/KiiThing.ts"/>
///<reference path="../model/KiiThingOwner.ts"/>
///<reference path="./KiiError.ts"/>
module Kii {
    export interface ThingAPI {
        create(id : string, password : string, info : any) : Promise<KiiThing>;
        addOwner(thing : KiiThing, owner : KiiThingOwner) : Promise<boolean>;
    }
}