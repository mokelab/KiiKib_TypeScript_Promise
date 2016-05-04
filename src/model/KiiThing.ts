module Kii {
    export class KiiThing {
        id : string;
        vendorId : string;
        public data : any;

        constructor(id : string) {
      	     this.id = id;
	}

        public getId() {
	     return this.id;
	}

        public getVendorId() {
            return this.vendorId;
        }
		    
	public getPath() {
	    return '/things/' + this.id;
	}
    }
}