///<reference path="../bin/KiiLib.d.ts"/>
class Application {
    router : any;
    page : Page;

    loggedIn : boolean;
    context : Kii.KiiContext;
    thingContext : Kii.KiiContext;
    userId : string;
    appAPI : Kii.AppAPI;
    bucketAPI : Kii.BucketAPI;
    thingIF : Kii.ThingIF;
    start() {
        this.loadContext();
    }

    loadContext() {
        try {
            var c = JSON.parse(sessionStorage.getItem('context'));
            this.initKiiAPI(c.appId, c.appKey, c.site);
            this.context.setAccessToken(c.token);
            this.thingContext.setAccessToken(c.token);
            this.userId = c.userId;
            this.loggedIn = true;
        } catch (e) {
            this.context = null;
            this.loggedIn = false;
        }
    }

    saveContext(user : Kii.KiiUser) {
        var data = {
            appId : this.context.getAppId(),
            appKey : this.context.getAppKey(),
            site : this.context.getServerUrl(),
            token : this.context.getAccessToken(),
            userId : user.getId(),
        };
        sessionStorage.setItem('context', JSON.stringify(data));
        this.userId = user.getId();
    }

    initKiiAPI(appId : string, appKey : string, site : string) {
        this.context = new Kii.KiiContext(appId, appKey, site);
        this.thingContext = new Kii.KiiContext(appId, appKey, 'https://api-jp.kii.com/thing-if');
        this.appAPI = new Kii.KiiAppAPI(this.context);
        this.bucketAPI = new Kii.KiiBucketAPI(this.context);
        this.thingIF = new Kii.KiiThingIF(this.thingContext);
    }

    showPage(name : string) {
        this.router.navigate(name, {trigger:true});
    }
}