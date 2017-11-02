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
            this.app.saveContext(user);
            this.app.showPage('top');
        }).catch((error) => {
            console.log('error!' + error);
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
            this.thingContext.setAccessToken(c.token);
            this.userId = c.userId;
            this.loggedIn = true;
        }
        catch (e) {
            this.context = null;
            this.loggedIn = false;
        }
    }
    saveContext(user) {
        var data = {
            appId: this.context.getAppId(),
            appKey: this.context.getAppKey(),
            site: this.context.getServerUrl(),
            token: this.context.getAccessToken(),
            userId: user.getId(),
        };
        sessionStorage.setItem('context', JSON.stringify(data));
        this.userId = user.getId();
    }
    initKiiAPI(appId, appKey, site) {
        this.context = new Kii.KiiContext(appId, appKey, site);
        this.thingContext = new Kii.KiiContext(appId, appKey, 'https://api-jp.kii.com/thing-if');
        this.appAPI = new Kii.KiiAppAPI(this.context);
        this.bucketAPI = new Kii.KiiBucketAPI(this.context);
        this.thingIF = new Kii.KiiThingIF(this.thingContext);
    }
    showPage(name) {
        this.router.navigate(name, { trigger: true });
    }
}
/// <reference path="./Page.ts"/>
/// <reference path="./Application.ts"/>
/// <reference path="./ractive.d.ts"/>
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
            onboard: () => {
                this.app.showPage('things/onboard');
            },
            thingState: () => {
                this.app.showPage('things/state');
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
/// <reference path="./Page.ts"/>
/// <reference path="./Application.ts"/>
/// <reference path="./ractive.d.ts"/>
class ThingStatePage {
    constructor(app) {
        this.app = app;
    }
    loginRequired() {
        return false;
    }
    onCreate() {
        this.ractive = new Ractive({
            el: '#container',
            template: '#thingStateTemplate',
            data: {
                state: null,
            },
            getState: () => {
                this.getState();
            },
            putState: () => {
                this.putState();
            },
        });
    }
    getState() {
        var id = this.ractive.get('getThingID');
        this.app.thingIF.getState(id).then((s) => {
            this.ractive.set({
                'state': s,
                'putThingID': id,
                'putValue': JSON.stringify(s, undefined, 4),
            });
        }).catch((e) => {
            console.log(e);
        });
    }
    putState() {
        var id = this.ractive.get('putThingID');
        var value;
        try {
            value = JSON.parse(this.ractive.get('putValue'));
        }
        catch (e) {
            alert(e);
            return;
        }
        this.app.thingIF.putState(id, value).then((b) => {
            console.log('ok');
        }).catch((e) => {
            console.log(e);
        });
    }
}
/// <reference path="./Page.ts"/>
/// <reference path="./Application.ts"/>
/// <reference path="./ractive.d.ts"/>
class OnboardThingsPage {
    constructor(app) {
        this.app = app;
    }
    loginRequired() {
        return false;
    }
    onCreate() {
        this.ractive = new Ractive({
            el: '#container',
            template: '#onboardThingsTemplate',
            data: {
                ownerID: 'USER:' + this.app.userId,
            },
            submit: () => {
                this.submit();
            },
        });
    }
    submit() {
        var vendorId = this.ractive.get('vendorID');
        var password = this.ractive.get('password');
        var ownerId = this.ractive.get('ownerID');
        this.app.thingIF.onboard(vendorId, password, ownerId).then((r) => {
            window.history.back();
        }).catch((e) => {
            console.log(e);
        });
    }
}
/// <reference path="./ractive.d.ts"/>
/// <reference path="./Page.ts"/>
/// <reference path="./LoginPage.ts"/>
/// <reference path="./TopPage.ts"/>
/// <reference path="./BucketPage.ts"/>
/// <reference path="./ThingStatePage.ts"/>
/// <reference path="./OnboardThingsPage.ts"/>
/// <reference path="./Application.ts"/>
var app = new Application();
var AppRouter = Backbone.Router.extend({
    routes: {
        "": 'login',
        "top": 'top',
        'app/buckets': 'appBucket',
        'things/onboard': 'onboardThings',
        'things/state': 'thingState',
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
    onboardThings: function () {
        this.showPage(new OnboardThingsPage(app));
    },
    thingState: function () {
        this.showPage(new ThingStatePage(app));
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
