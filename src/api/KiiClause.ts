module Kii {
    export class KiiClause {
	clause : any;

	constructor(type : string) {
	    this.clause = {
		'type' : type
	    };
	}
	
	static all() : KiiClause {
            return new KiiClause('all');
	}

	static equals(field : string, value : any) {
            var c = new KiiClause('eq');
            c.clause['field'] = field;
            c.clause['value'] = value;

            return c;
	}

	static greaterThan(field : string, value : any, include : boolean) {
            var c = new KiiClause('range');
            c.clause['field'] = field;
            c.clause['lowerLimit'] = value;
            c.clause['lowerIncluded'] = include;

            return c;
	}

	static lessThan(field : string, value : any, include : boolean) {
            var c = new KiiClause('range');
            c.clause['field'] = field;
            c.clause['upperLimit'] = value;
            c.clause['upperIncluded'] = include;

            return c;
	}

	static range(field : string,
		     fromValue : any, fromInclude : boolean,
                     toValue : any, toInclude : boolean) {
            var c = new KiiClause('range');
            c.clause['field'] = field;
            c.clause['lowerLimit'] = fromValue;
            c.clause['lowerIncluded'] = fromInclude;
            c.clause['upperLimit'] = toValue;
            c.clause['upperIncluded'] = toInclude;

            return c;
	}

	static inClause<T>(field : string, values : Array<T>) {
            var c = new KiiClause('in');
            c.clause['field'] = field;
            c.clause['values'] = values;

            return c;
	}

	static not(clause : KiiClause) {
            var c = new KiiClause('not');
            c.clause['clause'] = clause.toJson();

            return c;
	}

	static andClause(array : Array<KiiClause>) {
            var c = new KiiClause('and');
            c.clause['clauses'] = KiiClause.toClauses(array);

            return c;
	}

	static orClause(array : Array<KiiClause>) {
            var c = new KiiClause('or');
            c.clause['clauses'] = KiiClause.toClauses(array);

            return c;
	}

        private static toClauses(array : Array<KiiClause>) {
            for (var i = 0 ; i < array.length ; ++i) {
                array[i] = array[i].toJson();
            }
            return array;
        }

	toJson() : any {
            return this.clause;
	}
    }
}
