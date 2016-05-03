/// <reference path="./HttpClient.ts" />
var $ : any;
module jquery {
    export class JQueryClient implements Kii.HttpClient {
	private url : string;
	private method: string;
	private headers : any;

	constructor() {
	    this.headers = {};
	}
	
	setUrl(url : string) {
	    this.url = url;
	}

	setMethod(method : string) {
	    this.method = method;
	}
	  
	setContentType(value : string) {
	    this.setHeader('content-type', value);
	}

	setHeader(key : string, value : string) {
	    this.headers[key] = value;
	}

	setKiiHeader(context : Kii.KiiContext, authRequired : boolean) {
	    this.setHeader('x-kii-appid', context.getAppId());
	    this.setHeader('x-kii-appkey', context.getAppKey());
	    if (authRequired) {
		this.setHeader('authorization', 'bearer ' + context.getAccessToken());
	    }
	}

	sendText(text : string) : Promise<Kii.HttpResponse> {
	    return this.sendRequest({
		url : this.url,
		type : this.method,
		headers : this.headers,
		dataType : 'json',
		scriptCharset: 'utf-8',
		data : text,
		processData : false
	    });
	}
	
	sendJson(json : any) : Promise<Kii.HttpResponse> {
	    return this.sendText(JSON.stringify(json));
	}

	send() : Promise<Kii.HttpResponse> {
            return this.sendRequest({
		url : this.url,
		type : this.method,
		headers : this.headers,
		dataType : 'json',
		scriptCharset: 'utf-8',
		processData : false
	    });	    
	}

	private sendRequest(data : any) : Promise<Kii.HttpResponse> {
            return new Promise<Kii.HttpResponse>((resolve : (r : Kii.HttpResponse) => void, reject : (e : Kii.HttpError) => void) => {
	        $.ajax(data).done((data_ : any, status : number, data : any) => {
                    resolve(this.parseResponse(data));
		}).fail((data : any) => {
                    if (200 <= data.status && data.status < 300) {
                        resolve(this.parseResponse(data));
                        return;
                    }
                    var code;
                    var message;
                    try {
                        var body = JSON.parse(data.responseText);
                        code = body['errorCode'];
                        message = body['message'];
                    } catch (e) {
                        code = 'UNKNOWN';
                        message = data.responseText;
                    }
                    reject({
                        status : data.status,
                        code : code,
                        message : message,
                        headers : data.getAllResponseHeaders(),
                        body : data.responseText,
                    });
		});
            });	  
	}

        private parseResponse(data : any) {
            var body;
            try {
                if (data.status == 204) {
                    body = {};
                } else {
                    body = JSON.parse(data.responseText);
                }
            } catch (e) {
                body = data.responseText;
            }            
            return {
                status : data.status,
                headers : data.getAllResponseHeaders(),
                body : body,
            };
        }
    }
}