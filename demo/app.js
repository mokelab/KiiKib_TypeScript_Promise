class LoginPage {
    constructor(app) {
        this.app = app;
    }
    loginRequired() {
        return false;
    }
    onCreate() {
        if (this.app.loggedIn) {
            this.app.showPage('top');
            return;
        }
        this.ractive = new Ractive({
            el: '#container',
            template: '#loginTemplate',
            data: {
                appId: '',
                appKey: '',
                sites: [{ name: 'US', url: 'https://api.kii.com/api' },
                    { name: 'JP', url: 'https://api-jp.kii.com/api' }],
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
        var site = this.ractive.get('site');
        var id = this.ractive.get('id');
        var pass = this.ractive.get('pass');
        this.app.initKiiAPI(appId, appKey, site);
        this.app.appAPI.login(id, pass).then((user) => {
            this.app.saveContext();
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
    loginRequired() {
        return false;
    }
    onCreate() {
        this.ractive = new Ractive({
            el: '#container',
            template: '#topTemplate',
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
    loginRequired() {
        return false;
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
            query: () => {
                this.query();
            },
        });
        this.ractive.on({
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
        this.loadContext();
    }
    loadContext() {
        try {
            var c = JSON.parse(sessionStorage.getItem('context'));
            this.initKiiAPI(c.appId, c.appKey, c.site);
            this.context.setAccessToken(c.token);
            this.loggedIn = true;
        }
        catch (e) {
            this.context = null;
            this.loggedIn = false;
        }
    }
    saveContext() {
        var data = {
            appId: this.context.getAppId(),
            appKey: this.context.getAppKey(),
            site: this.context.getServerUrl(),
            token: this.context.getAccessToken(),
        };
        sessionStorage.setItem('context', JSON.stringify(data));
    }
    initKiiAPI(appId, appKey, site) {
        this.context = new Kii.KiiContext(appId, appKey, site);
        this.appAPI = new Kii.KiiAppAPI(this.context);
        this.bucketAPI = new Kii.KiiBucketAPI(this.context);
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
