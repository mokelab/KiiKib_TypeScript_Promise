var Kii;
(function (Kii) {
    class KiiUser {
        constructor(id) {
            this.id = id;
        }
        getId() {
            return this.id;
        }
        getPath() {
            return '/users/' + this.id;
        }
        getSubject() {
            return 'UserID:' + this.id;
        }
    }
    Kii.KiiUser = KiiUser;
})(Kii || (Kii = {}));
