///<reference path="./KiiApp.ts"/>
var Kii;
(function (Kii) {
    class KiiBucket {
        constructor(owner, name) {
            this.owner = owner;
            this.name = name;
        }
        getName() {
            return this.name;
        }
        getPath() {
            return this.owner.getPath() + '/buckets/' + this.name;
        }
    }
    Kii.KiiBucket = KiiBucket;
})(Kii || (Kii = {}));
