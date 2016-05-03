/// <reference path="KiiClause.ts"/>
var Kii;
(function (Kii) {
    class QueryParams {
        constructor(clause) {
            this.clause = clause;
            this.orderBy = null;
            this.descending = false;
            this.paginationKey = null;
            this.limit = 0;
        }
        sortByAsc(field) {
            this.orderBy = field;
            this.descending = false;
        }
        sortByDesc(field) {
            this.orderBy = field;
            this.descending = true;
        }
        setLimit(limit) {
            this.limit = limit;
        }
        setPaginationKey(key) {
            if (typeof key == 'undefined') {
                key = null;
            }
            this.paginationKey = key;
        }
        hasNext() {
            return this.paginationKey != null;
        }
        toJson() {
            var query = {
                'clause': this.clause.toJson()
            };
            if (this.orderBy != null) {
                query['orderBy'] = this.orderBy;
                query['descending'] = this.descending;
            }
            var json = {
                'bucketQuery': query
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
    Kii.QueryParams = QueryParams;
})(Kii || (Kii = {}));
