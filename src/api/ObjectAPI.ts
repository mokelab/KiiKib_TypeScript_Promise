/// <reference path="../model/KiiBucket.ts"/>
/// <reference path="../model/KiiBucket.ts"/>
module Kii {
    export interface ObjectAPI {
        create(bucket : KiiBucket, data : any) : Promise<KiiObject>;

        getById(bucket : KiiBucket, id : string) : Promise<KiiObject>;

        update(obj : KiiObject) : Promise<KiiObject>;

        updatePatch(obj : KiiObject, patch : any) : Promise<KiiObject>;

        deleteObject(obj : KiiObject) : Promise<boolean>;
    }
}