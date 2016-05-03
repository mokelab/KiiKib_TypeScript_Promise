/// <reference path="KiiBucket.ts"/>
var Kii;
(function (Kii) {
    class KiiObject {
        constructor(bucket, id, data) {
            this.bucket = bucket;
            this.id = id;
            this.data = data;
        }
        getId() {
            return this.id;
        }
        getPath() {
            return this.bucket.getPath() +
                '/objects/' + this.id;
        }
    }
    Kii.KiiObject = KiiObject;
})(Kii || (Kii = {}));
