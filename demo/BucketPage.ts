class BucketPage implements Page {
    app : Application;
    ractive : Ractive;
    
    constructor(app : Application) {
        this.app = app;
    }
    
    onCreate() {
        this.ractive = new Ractive({
            el : '#container',
            template : '#bucketTemplate',
        });
        this.ractive.on({
            query : () => {
                this.query();
            },
        });
    }

    private query() {
        var name = this.ractive.get('name');
        console.log('name=' + name);
    }
}