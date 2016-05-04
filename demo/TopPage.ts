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
        });
        this.ractive.on({
            appScope : () => {
                this.showAppScopeBucket();
            },
        });
    }

    private showAppScopeBucket() {
        this.app.showPage('app/buckets');
    }
}