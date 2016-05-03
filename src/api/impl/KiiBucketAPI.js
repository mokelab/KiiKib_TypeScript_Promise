/// <reference path="../BucketAPI.ts" />
/// <reference path="../KiiContext.ts" />
var Kii;
(function (Kii) {
    class KiiBucketAPI {
        constructor(context) {
            this.context = context;
        }
        query(bucket, params) {
            return new Promise((resolve, reject) => {
                var c = this.context;
                var url = c.getServerUrl() +
                    '/apps/' + c.getAppId() +
                    bucket.getPath() +
                    '/query';
                var client = c.getNewClient();
                client.setUrl(url);
                client.setMethod('POST');
                client.setKiiHeader(c, true);
                client.setContentType('application/vnd.kii.QueryRequest+json');
                var resp;
                client.sendJson(params.toJson()).then((resp) => {
                    var nextPaginationKey = resp.body['nextPaginationKey'];
                    params.setPaginationKey(nextPaginationKey);
                    var respArray = resp.body['results'];
                    var result = new Array();
                    for (var i = 0; i < respArray.length; ++i) {
                        var item = respArray[i];
                        var id = item['_id'];
                        result.push(new Kii.KiiObject(bucket, id, item));
                    }
                    ;
                    resolve({
                        results: result,
                        params: params
                    });
                }).catch((error) => {
                    reject({ code: error.status, message: '' });
                });
            });
        }
    }
    Kii.KiiBucketAPI = KiiBucketAPI;
})(Kii || (Kii = {}));
