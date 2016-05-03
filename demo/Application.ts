///<reference path="../bin/KiiLib.d.ts"/>
class Application {
    router : any;
    page : Page;
    appAPI : Kii.AppAPI;
    bucketAPI : Kii.BucketAPI;
    start() {
    }

    initKiiAPI(appId : string, appKey : string) {
        var context = new Kii.KiiContext(appId, appKey, 'https://api-jp.kii.com/api');
        this.appAPI = new Kii.KiiAppAPI(context);
        this.bucketAPI = new Kii.KiiBucketAPI(context);
    }

    showPage(name : string) {
        this.router.navigate(name, {trigger:true});
    }
}