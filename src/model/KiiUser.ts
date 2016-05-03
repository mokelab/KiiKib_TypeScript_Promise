module Kii {
    export class KiiUser {
        id : string;
        public data : any;

        constructor(id : string) {
      	     this.id = id;
	}

        public getId() {
	     return this.id;
	}
		    
	public getPath() {
	    return '/users/' + this.id;
	}

        public getSubject() {
            return 'UserID:' + this.id;
        }
    }
}