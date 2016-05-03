/// <reference path="../BucketAPI.ts" />
/// <reference path="../KiiContext.ts" />

module Kii {
    export class KiiBucketAPI implements BucketAPI {
        context : KiiContext;

	constructor(context : KiiContext) {
	    this.context = context;
        }

	query(bucket : KiiBucket, params : QueryParams) : Promise<QueryResult> {
            return new Promise<QueryResult>((resolve : (r : QueryResult) => void, reject : (e : KiiError) => void) => {
                var c = this.context;
                var url = c.getServerUrl() + 
		    '/apps/'+ c.getAppId() +
		    bucket.getPath() +
		    '/query';
                
                var client = c.getNewClient();
                client.setUrl(url);
                client.setMethod('POST');
                client.setKiiHeader(c, true);
                client.setContentType('application/vnd.kii.QueryRequest+json');
                
                var resp : QueryResult;
                client.sendJson(params.toJson()).then((resp : HttpResponse) => {
		    var nextPaginationKey = resp.body['nextPaginationKey'];
		    params.setPaginationKey(nextPaginationKey);
		    
		    var respArray = resp.body['results'];
		    var result = new Array<KiiObject>();
		    for (var i = 0 ; i < respArray.length ; ++i) {
		        var item = respArray[i];
		        var id = item['_id'];
		        result.push(new KiiObject(bucket, id, item));
		    };
                    resolve({
                            results : result,
                            params : params
                    });
	        }).catch((error : HttpError) => {
                    reject({code : error.status, message : ''});
	        });
	    });
        }
    }
}
