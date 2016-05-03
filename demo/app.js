class LoginPage {
    constructor(app) {
        this.app = app;
    }
    onCreate() {
        this.ractive = new Ractive({
            el: '#container',
            template: '#loginTemplate',
            data: {
                appId: 'd8d48a46',
                appKey: '50375c4b608dc79469796e4a06638439',
            },
        });
        this.ractive.on({
            login: () => {
                this.login();
            },
        });
    }
    login() {
        var appId = this.ractive.get('appId');
        var appKey = this.ractive.get('appKey');
        var id = this.ractive.get('id');
        var pass = this.ractive.get('pass');
        this.app.initKiiAPI(appId, appKey);
        this.app.appAPI.login(id, pass).then((user) => {
            this.app.showPage('top');
        }).catch((error) => {
            console.log('error!' + error);
        });
    }
}
class TopPage {
    constructor(app) {
        this.app = app;
    }
    onCreate() {
        this.ractive = new Ractive({
            el: '#container',
            template: '#topTemplate',
        });
        this.ractive.on({
            appScope: () => {
                this.showAppScopeBucket();
            },
        });
    }
    showAppScopeBucket() {
        this.app.showPage('app/buckets');
    }
}
class BucketPage {
    constructor(app, owner) {
        this.app = app;
        this.owner = owner;
    }
    onCreate() {
        this.ractive = new Ractive({
            el: '#container',
            template: '#bucketTemplate',
            data: {
                fieldList: [],
                fieldName: '',
                list: [],
            },
        });
        this.ractive.on({
            query: () => {
                this.query();
            },
            addField: () => {
                let name = this.ractive.get('fieldName');
                if (name != null && name.length > 0) {
                    this.ractive.push('fieldList', name);
                    this.ractive.set('fieldName', '');
                }
            },
            removeField: (e, index) => {
                this.ractive.splice('fieldList', index, 1);
            },
        });
    }
    query() {
        var name = this.ractive.get('name');
        var bucket = new Kii.KiiBucket(this.owner, name);
        var params = new Kii.QueryParams(Kii.KiiClause.all());
        this.app.bucketAPI.query(bucket, params).then((result) => {
            var list = this.ractive.get('list');
            for (var i = 0; i < result.results.length; ++i) {
                list.push(result.results[i]);
            }
            this.ractive.update();
        }).catch((error) => {
            console.log('error', error);
        });
    }
}
///<reference path="../bin/KiiLib.d.ts"/>
class Application {
    start() {
    }
    initKiiAPI(appId, appKey) {
        var context = new Kii.KiiContext(appId, appKey, 'https://api-jp.kii.com/api');
        this.appAPI = new Kii.KiiAppAPI(context);
        this.bucketAPI = new Kii.KiiBucketAPI(context);
    }
    showPage(name) {
        this.router.navigate(name, { trigger: true });
    }
}
/// <reference path="./ractive.d.ts"/>
/// <reference path="./Page.ts"/>
/// <reference path="./LoginPage.ts"/>
/// <reference path="./TopPage.ts"/>
/// <reference path="./BucketPage.ts"/>
/// <reference path="./Application.ts"/>
var app = new Application();
var AppRouter = Backbone.Router.extend({
    routes: {
        "": 'login',
        "top": 'top',
        'app/buckets': 'appBucket',
    },
    login: function () {
        this.showPage(new LoginPage(app));
    },
    top: function () {
        this.showPage(new TopPage(app));
    },
    appBucket: function () {
        this.showPage(new BucketPage(app, new Kii.KiiApp()));
    },
    showPage: function (page) {
        app.page = page;
        app.page.onCreate();
    },
});
$(() => {
    app.start();
    app.router = new AppRouter();
    Backbone.history.start();
});
