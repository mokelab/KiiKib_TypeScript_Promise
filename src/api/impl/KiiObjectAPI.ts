/// <reference path="../ObjectAPI.ts" />
/// <reference path="../KiiContext.ts" />

module Kii {
    export class KiiObjectAPI implements ObjectAPI {
        context : KiiContext;

	constructor(context : KiiContext) {
	    this.context = context;
        }

        create(bucket : KiiBucket, data : any) : Promise<KiiObject> {
            return new Promise<KiiObject>((resolve : (obj : KiiObject) => void, reject : (err : KiiError) => void) => {
	        var c : KiiContext = this.context;
	        var url = c.getServerUrl() + '/apps/'+ c.getAppId() +
		    bucket.getPath() + '/objects';

	        var client = c.getNewClient();
	        client.setUrl(url);
	        client.setMethod('POST');
	        client.setKiiHeader(c, true);
	        client.setContentType('application/json');

	        client.sendJson(data).then((resp : HttpResponse) => {
                    var id = resp.body['objectID'];
		    resolve(new KiiObject(bucket, id, data));
		}).catch((error : HttpError) => {
                    reject({code : error.status, message : error.message});
                });
            });
        }

        getById(bucket : KiiBucket, id : string) : Promise<KiiObject> {
            return new Promise<KiiObject>((resolve : (obj : KiiObject) => void, reject : (err : KiiError) => void) => {
	        var c : KiiContext = this.context;
	        var url = c.getServerUrl() + '/apps/'+ c.getAppId() +
		    bucket.getPath() + '/objects/' + id;
	        var client = c.getNewClient();
	        client.setUrl(url);
	        client.setMethod('GET');
	        client.setKiiHeader(c, true);

	        client.send().then((resp : HttpResponse) => {
		    resolve(new KiiObject(bucket, id, resp.body));
		}).catch((error : HttpError) => {
                    reject({code : error.status, message : error.message});
                });
            });
        }

        update(obj : KiiObject) : Promise<KiiObject> {
            return new Promise<KiiObject>((resolve : (obj : KiiObject) => void, reject : (err : KiiError) => void) => {
                var c = this.context;
                var url = c.getServerUrl() + '/apps/' + c.getAppId() +
		    obj.getPath();

                var client = c.getNewClient();
                client.setUrl(url);
                client.setMethod('PUT');
                client.setKiiHeader(c, true);
                client.setContentType('application/json');

                client.sendJson(obj.data).then((resp : HttpResponse) => {
                    resolve(obj);
                }).catch((error : HttpError) => {
                    reject({code : error.status, message : error.message});
                });
            });
        }

        updatePatch(obj : KiiObject, patch : any) : Promise<KiiObject> {
            return new Promise<KiiObject>((resolve : (obj : KiiObject) => void, reject : (err : KiiError) => void) => {
                var c = this.context;
                var url = c.getServerUrl() + '/apps/' + c.getAppId() +
		    obj.getPath();

                var client = c.getNewClient();
                client.setUrl(url);
                client.setMethod('POST');
                client.setKiiHeader(c, true);
                client.setHeader('X-HTTP-Method-Override', 'PATCH');
                client.setContentType('application/json');

                client.sendJson(patch).then((resp : HttpResponse) => {
                    // apply patch
                    for (var k in patch) {
                        obj.data[k] = patch[k];
                    }
                    resolve(obj);
                }).catch((error : HttpError) => {
                    reject({code : error.status, message : error.message});
                });
            });
        }

        deleteObject(obj : KiiObject) : Promise<boolean> {
            return new Promise<boolean>((resolve : (result : boolean) => void, reject : (err : KiiError) => void) => {
                var c = this.context;
                var url = c.getServerUrl() + '/apps/'+ c.getAppId() +
		    obj.getPath();

                var client = c.getNewClient();
                client.setUrl(url);
                client.setMethod('DELETE');
                client.setKiiHeader(c, true);
                
                client.send().then((resp : HttpResponse) => {
                    resolve(true);
                }).catch((error : HttpError) => {
                    reject({code : error.status, message : error.message});
                });
            });
        }

        publish(obj : KiiObject, expireInSec? : number) : Promise<string> {
            return new Promise<string>((resolve : (url : string) => void, reject : (err : KiiError) => void) => {
                var c = this.context;
                var url = c.getServerUrl() + '/apps/'+ c.getAppId() +
		    obj.getPath() + '/body/publish';

                var client = c.getNewClient();
                client.setUrl(url);
                client.setMethod('POST');
                client.setKiiHeader(c, true);
                client.setContentType('application/vnd.kii.ObjectBodyPublicationRequest+json');

                var p : Promise<HttpResponse>;
                if (expireInSec === undefined) {
                    p = client.send();
                } else {
                    p = client.sendJson({
                        expiresIn : expireInSec,
                    });
                }
                p.then((resp : HttpResponse) => {
                    var url = resp.body['url'];
                    resolve(url);
                }).catch((error : HttpError) => {
                    reject({code : error.status, message : error.message});
                });
            });
        }
    }
}