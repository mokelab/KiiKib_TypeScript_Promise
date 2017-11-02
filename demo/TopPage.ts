/// <reference path="./Page.ts"/>
/// <reference path="./Application.ts"/>
/// <reference path="./ractive.d.ts"/>
class TopPage implements Page {
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
            template : '#topTemplate',
            appScope : () => {
                this.showAppScopeBucket();
            },
            onboard : () => {
                this.app.showPage('things/onboard');
            },            
            thingState : () => {
                this.app.showPage('things/state');
            },
        });
    }

    private showAppScopeBucket() {
        this.app.showPage('app/buckets');
    }
}