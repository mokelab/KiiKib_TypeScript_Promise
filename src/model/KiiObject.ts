/// <reference path="KiiBucket.ts"/>
module Kii {
    export class KiiObject {
	bucket : KiiBucket;
	id : string;
	data : any;

	constructor(bucket : KiiBucket, id : string, data : any) {
            this.bucket = bucket;
            this.id = id;
            this.data = data;
	}
	
	public getId() : string {
            return this.id;
	}

	public getPath() : string {
            return this.bucket.getPath() + 
		'/objects/' + this.id;
	}
    }
}