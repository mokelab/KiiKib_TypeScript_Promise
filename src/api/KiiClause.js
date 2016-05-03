var Kii;
(function (Kii) {
    class KiiClause {
        constructor(type) {
            this.clause = {
                'type': type
            };
        }
        static all() {
            return new KiiClause('all');
        }
        static equals(field, value) {
            var c = new KiiClause('eq');
            c.clause['field'] = field;
            c.clause['value'] = value;
            return c;
        }
        static greaterThan(field, value, include) {
            var c = new KiiClause('range');
            c.clause['field'] = field;
            c.clause['lowerLimit'] = value;
            c.clause['lowerIncluded'] = include;
            return c;
        }
        static lessThan(field, value, include) {
            var c = new KiiClause('range');
            c.clause['field'] = field;
            c.clause['upperLimit'] = value;
            c.clause['upperIncluded'] = include;
            return c;
        }
        static range(field, fromValue, fromInclude, toValue, toInclude) {
            var c = new KiiClause('range');
            c.clause['field'] = field;
            c.clause['lowerLimit'] = fromValue;
            c.clause['lowerIncluded'] = fromInclude;
            c.clause['upperLimit'] = toValue;
            c.clause['upperIncluded'] = toInclude;
            return c;
        }
        static inClause(field, values) {
            var c = new KiiClause('in');
            c.clause['field'] = field;
            c.clause['values'] = values;
            return c;
        }
        static not(clause) {
            var c = new KiiClause('not');
            c.clause['clause'] = clause.toJson();
            return c;
        }
        static andClause(array) {
            var c = new KiiClause('and');
            c.clause['clauses'] = KiiClause.toClauses(array);
            return c;
        }
        static orClause(array) {
            var c = new KiiClause('or');
            c.clause['clauses'] = KiiClause.toClauses(array);
            return c;
        }
        static toClauses(array) {
            for (var i = 0; i < array.length; ++i) {
                array[i] = array[i].toJson();
            }
            return array;
        }
        toJson() {
            return this.clause;
        }
    }
    Kii.KiiClause = KiiClause;
})(Kii || (Kii = {}));
