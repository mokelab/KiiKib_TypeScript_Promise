class LoginPage {
    constructor(app) {
        this.app = app;
    }
    onCreate() {
        this.ractive = new Ractive({
            el: '#container',
            template: '#loginTemplate',
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
            console.log('OK ' + user);
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
    constructor(app) {
        this.app = app;
    }
    onCreate() {
        this.ractive = new Ractive({
            el: '#container',
            template: '#bucketTemplate',
        });
        this.ractive.on({
            query: () => {
                this.query();
            },
        });
    }
    query() {
        var name = this.ractive.get('name');
        console.log('name=' + name);
    }
}
///<reference path="../bin/KiiLib.d.ts"/>
class Application {
    start() {
    }
    initKiiAPI(appId, appKey) {
        var context = new Kii.KiiContext(appId, appKey, 'https://api-jp.kii.com/api');
        this.appAPI = new Kii.KiiAppAPI(context);
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
        this.showPage(new BucketPage(app));
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
