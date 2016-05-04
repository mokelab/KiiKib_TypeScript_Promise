class BucketPage implements Page {
    app : Application;    
    ractive : Ractive;
    owner : any;
    
    constructor(app : Application, owner : any) {
        this.app = app;
        this.owner = owner;
    }

    loginRequired() : boolean {
        return false;
    }
    
    onCreate() {
        this.ractive = new Ractive({
            el : '#container',
            template : '#bucketTemplate',
            data : {
                fieldList : [],
                fieldName : '',
                list : [],
            },
        });
        this.ractive.on({            
            query : () => {
                this.query();
            },
            addField : () => {
                let name = this.ractive.get('fieldName');
                if (name != null && name.length > 0) {
                    this.ractive.push('fieldList', name);
                    this.ractive.set('fieldName', '');
                }
            },
            removeField : (e : any, index : number) => {
                this.ractive.splice('fieldList', index, 1);
            },
        });        
    }

    private query() {
        var name = this.ractive.get('name');
        
        var bucket = new Kii.KiiBucket(this.owner, name);
        var params = new Kii.QueryParams(Kii.KiiClause.all());
        this.app.bucketAPI.query(bucket, params).then((result : Kii.QueryResult) => {
            var list = this.ractive.get('list');
            for (var i = 0 ; i < result.results.length ; ++i) {
                list.push(result.results[i]);
            }
            this.ractive.update();
        }).catch((error : Kii.KiiError) => {
            console.log('error', error);
        });
    }
}