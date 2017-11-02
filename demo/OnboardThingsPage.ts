/// <reference path="./Page.ts"/>
/// <reference path="./Application.ts"/>
/// <reference path="./ractive.d.ts"/>
class OnboardThingsPage implements Page {
    app : Application;
    ractive : Ractive;
    
    constructor(app : Application) {
        this.app = app;
    }

    loginRequired() : boolean {
        return false;
    }
    
    onCreate() {
        this.ractive = new Ractive({
            el : '#container',
            template : '#onboardThingsTemplate',
            data : {
                ownerID : 'USER:' + this.app.userId,
            },
            submit: () => {
                this.submit();
            },
        });
    }

    private submit() {
        var vendorId = this.ractive.get('vendorID');
        var password = this.ractive.get('password');
        var ownerId = this.ractive.get('ownerID');

        this.app.thingIF.onboard(vendorId, password, ownerId).then((r : Kii.OnboardResult) => {
            window.history.back();
        }).catch((e : any) => {
            console.log(e);
        })
    }
}