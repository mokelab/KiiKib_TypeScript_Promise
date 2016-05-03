///<reference path="./KiiApp.ts"/>
module Kii {
    export class KiiBucket {
        owner : any;
        name : string;

        constructor(owner : any, name : string) {
	    this.owner = owner;
	    this.name = name;
	}

        public getName() {
	    return this.name;
	}
		    
	public getPath() {
	    return this.owner.getPath() + '/buckets/' + this.name;
	}
    }
}