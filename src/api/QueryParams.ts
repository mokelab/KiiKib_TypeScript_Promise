/// <reference path="KiiClause.ts"/>
module Kii {
    export class QueryParams {
	clause : KiiClause;
	orderBy : string;
	descending : boolean;
	limit : number;
	paginationKey : string;
	
        constructor(clause : any) {
	    this.clause = clause;
	    this.orderBy = null;
	    this.descending = false;
	    this.paginationKey = null;
	    this.limit = 0;
	}

	public sortByAsc(field : string ) {
            this.orderBy = field;
            this.descending = false;
	}

	public sortByDesc(field : string) {
            this.orderBy = field;
            this.descending = true;
	}

	public setLimit(limit : number) {
            this.limit = limit;
	}

	public setPaginationKey(key : string) {
	    if (typeof key == 'undefined') {
		key = null;
	    }
            this.paginationKey = key;
	}

	public hasNext() {
            return this.paginationKey != null;
	}

	public toJson() : any {
	    var query = {
		'clause' : this.clause.toJson()
	    };
	    if (this.orderBy != null) {
		query['orderBy'] = this.orderBy;
		query['descending'] = this.descending;
	    }

	    var json = {
		'bucketQuery' : query
	    };
	    if (this.limit > 0) {
		json['bestEffortLimit'] = this.limit;
	    }
	    if (this.paginationKey != null) {
		json['paginationKey'] = this.paginationKey;
	    }
	    
	    return json;
	}
    }
}