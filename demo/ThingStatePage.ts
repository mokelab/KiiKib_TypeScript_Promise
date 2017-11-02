/// <reference path="./Page.ts"/>
/// <reference path="./Application.ts"/>
/// <reference path="./ractive.d.ts"/>
class ThingStatePage implements Page {
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
            template : '#thingStateTemplate',
            data : {
                state : null,
            },
            getState : () => {
                this.getState();
            },
            putState : () => {
                this.putState();
            },            
        });
    }

    private getState() {
        var id = this.ractive.get('getThingID');

        this.app.thingIF.getState(id).then((s : any) => {
            this.ractive.set({
                'state': s,
                'putThingID': id,
                'putValue': JSON.stringify(s, undefined, 4),
            });
        }).catch((e : any) => {
            console.log(e);
        })
    }

    private putState() {
        var id = this.ractive.get('putThingID');
        var value;
        try {
            value = JSON.parse(this.ractive.get('putValue'));
        } catch (e) {
            alert(e);
            return;
        }

        this.app.thingIF.putState(id, value).then((b : boolean) => {
            console.log('ok');
        }).catch((e : any) => {
            console.log(e);
        })
    }    
}