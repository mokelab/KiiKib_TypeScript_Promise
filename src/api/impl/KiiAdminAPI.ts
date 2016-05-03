///<reference path="../AdminAPI.ts"/>
///<reference path="../KiiContext.ts"/>
module Kii {
    export class KiiAdminAPI implements AdminAPI {
        context : KiiContext;

        constructor(context : KiiContext) {
            this.context = context;
        }

        getAppInfo() : Promise<any> {
            return new Promise<any>((resolve : (info : any) => void, reject : (err : KiiError) => void) => {
                var c : KiiContext = this.context;
                var url = c.getServerUrl() + '/apps/'+ c.getAppId();

                var client : HttpClient = c.getNewClient();
                client.setUrl(url);
                client.setMethod('GET');
                client.setKiiHeader(c, true);

                client.send().then((resp : HttpResponse) => {
                    resolve(resp.body);
                }).catch((error : HttpError) => {
                    reject({code : error.status, message : error.message});
                });
            });
        }

        getServerCodeList() : Promise<Array<KiiServerCode>> {
            return new Promise<Array<KiiServerCode>>((resolve : (list : Array<KiiServerCode>) => void, reject : (err : KiiError) => void) => {
                var c : KiiContext = this.context;
                var url = c.getServerUrl() + '/apps/'+ c.getAppId() + 
                    '/server-code/versions';

                var client : HttpClient = c.getNewClient();
                client.setUrl(url);
                client.setMethod('GET');
                client.setKiiHeader(c, true);

                client.send().then((resp : HttpResponse) => {
                    var result : Array<KiiServerCode> = [];
                    var respArray = resp.body['versions'];
                    for (var i = 0; i < respArray.length ; ++i) {                        
                        var o = respArray[i];
                        var code = new KiiServerCode(o['versionID']);
                        code.current = o['current'];
                        result.push(code);
                    }
                    resolve(result);
                }).catch((error : HttpError) => {
                    reject({code : error.status, message : error.message});
                });
            });
        }
        
        uploadServerCode(code : string) : Promise<string> {
            return new Promise<string>((resolve : (id : string) => void, reject : (err : KiiError) => void) => {
                var c : KiiContext = this.context;
                var url = c.getServerUrl() + '/apps/'+ c.getAppId() + '/server-code';

                var client : HttpClient = c.getNewClient();
                client.setUrl(url);
                client.setMethod('POST');
                client.setKiiHeader(c, true);
                client.setContentType('application/javascript');

                client.sendText(code).then((resp : HttpResponse) => {
                    resolve(resp.body['versionID']);
                }).catch((error : HttpError) => {
                    reject({code : error.status, message : error.message});
                });
            });
        }

        downloadServerCode(versionId : string) : Promise<string> {
            return new Promise<string>((resolve : (code : string) => void, reject : (err : KiiError) => void) => {
                var c : KiiContext = this.context;
                var url = c.getServerUrl() + '/apps/'+ c.getAppId() + '/server-code/versions/' + versionId;

                var client : HttpClient = c.getNewClient();
                client.setUrl(url);
                client.setMethod('GET');
                client.setKiiHeader(c, true);

                client.send().then((resp : HttpResponse) => {
                    resolve(resp.body);
                }).catch((error : HttpError) => {
                    reject({code : error.status, message : error.message});
                });
            });
        }

        setCurrentServerCode(versionId : string) : Promise<boolean> {
            return new Promise<boolean>((resolve : (result : boolean) => void, reject : (err : KiiError) => void) => {
                var c : KiiContext = this.context;
                var url = c.getServerUrl() + '/apps/'+ c.getAppId() + '/server-code/versions/current';

                var client : HttpClient = c.getNewClient();
                client.setUrl(url);
                client.setMethod('PUT');
                client.setKiiHeader(c, true);
                client.setContentType('text/plain');

                client.sendText(versionId).then((resp : HttpResponse) => {
                    resolve(true);
                }).catch((error : HttpError) => {
                    reject({code : error.status, message : error.message});
                });
            });
        }

        deleteServerCode(versionId : string) : Promise<boolean> {
            return new Promise<boolean>((resolve : (result : boolean) => void, reject : (err : KiiError) => void) => {
                var c : KiiContext = this.context;
                var url = c.getServerUrl() + '/apps/'+ c.getAppId() + '/server-code/versions/' + versionId;

                var client : HttpClient = c.getNewClient();
                client.setUrl(url);
                client.setMethod('DELETE');
                client.setKiiHeader(c, true);

                client.sendText(versionId).then((resp : HttpResponse) => {
                    resolve(true);
                }).catch((error : HttpError) => {
                    reject({code : error.status, message : error.message});
                });
            });
        }
    }
}