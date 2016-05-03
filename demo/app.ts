/// <reference path="./ractive.d.ts"/>
/// <reference path="./Page.ts"/>
/// <reference path="./LoginPage.ts"/>
/// <reference path="./TopPage.ts"/>
/// <reference path="./BucketPage.ts"/>
/// <reference path="./Application.ts"/>
declare var $;
declare var _;
declare var Backbone;

var app = new Application();

var AppRouter = Backbone.Router.extend({
    routes : {
        "" : 'login',
        "top" : 'top',
        'app/buckets' : 'appBucket',
    },
    login : function() {
        this.showPage(new LoginPage(app));
    },
    top : function() {
        this.showPage(new TopPage(app));
    },
    appBucket : function() {
        this.showPage(new BucketPage(app));
    },
    showPage : function(page : Page) {
        app.page = page;
        app.page.onCreate();
    },
});

$(() => {
    app.start();
    app.router = new AppRouter();
    Backbone.history.start();
});