class LoginPage implements Page {
    app : Application;
    ractive : Ractive;
    
    constructor(app : Application) {
        this.app = app;
    }
    
    onCreate() {
        this.ractive = new Ractive({
            el : '#container',
            template : '#loginTemplate',
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
        var id = this.ractive.get('id');
        var pass = this.ractive.get('pass');
        
        this.app.initKiiAPI(appId, appKey);
        this.app.appAPI.login(id, pass).then((user : Kii.KiiUser) => {
            console.log('OK ' + user);
        }).catch((error : Kii.KiiError) => {
            console.log('error!' + error);
        });
    }
}