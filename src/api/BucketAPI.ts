/// <reference path="../model/KiiBucket.ts"/>
/// <reference path="../model/KiiObject.ts"/>
/// <reference path="./QueryParams.ts"/>
module Kii {
    export interface BucketAPI {
        query(bucket : KiiBucket, params : QueryParams) : Promise<QueryResult>;
    }

    export interface QueryResult {
        results : Array<KiiObject>;
        params : QueryParams;
    }
}