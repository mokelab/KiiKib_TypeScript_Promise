class LoginPage implements Page {
    app : Application;
    ractive : Ractive;
    
    constructor(app : Application) {
        this.app = app;
    }

    loginRequired() : boolean {
        return false;
    }
    
    onCreate() {
        if (this.app.loggedIn) {
            this.app.showPage('top');
            return;
        }
        this.ractive = new Ractive({
            el : '#container',
            template : '#loginTemplate',
            data : {
                appId : '',
                appKey : '',
                sites : [{name : 'US', url : 'https://api.kii.com/api'},
                         {name : 'JP', url : 'https://api-jp.kii.com/api'}],                
            },
        });
        this.ractive.on({
            login : () => {
                this.login();
            },
        });
    }

    private login() {
        var appId = this.ractive.get('appId');
        var appKey = this.ractive.get('appKey');
        var site = this.ractive.get('site');
        var id = this.ractive.get('id');
        var pass = this.ractive.get('pass');
        
        this.app.initKiiAPI(appId, appKey, site);
        this.app.appAPI.login(id, pass).then((user : Kii.KiiUser) => {
            this.app.saveContext();
            this.app.showPage('top');
        }).catch((error : Kii.KiiError) => {
            console.log('error!' + error);
        });
    }
}