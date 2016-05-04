///<reference path="../bin/KiiLib.d.ts"/>
class Application {
    router : any;
    page : Page;

    loggedIn : boolean;
    context : Kii.KiiContext;
    appAPI : Kii.AppAPI;
    bucketAPI : Kii.BucketAPI;
    start() {
        this.loadContext();
    }

    loadContext() {
        try {
            var c = JSON.parse(sessionStorage.getItem('context'));
            this.initKiiAPI(c.appId, c.appKey, c.site);
            this.context.setAccessToken(c.token);
            this.loggedIn = true;
        } catch (e) {
            this.context = null;
            this.loggedIn = false;
        }
    }

    saveContext() {
        var data = {
            appId : this.context.getAppId(),
            appKey : this.context.getAppKey(),
            site : this.context.getServerUrl(),
            token : this.context.getAccessToken(),
        };
        sessionStorage.setItem('context', JSON.stringify(data));
    }

    initKiiAPI(appId : string, appKey : string, site : string) {
        this.context = new Kii.KiiContext(appId, appKey, site);
        this.appAPI = new Kii.KiiAppAPI(this.context);
        this.bucketAPI = new Kii.KiiBucketAPI(this.context);
    }

    showPage(name : string) {
        this.router.navigate(name, {trigger:true});
    }
}