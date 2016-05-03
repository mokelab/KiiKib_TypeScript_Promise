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
	    var data = {
		url : this.url,
		type : this.method,
		headers : this.headers,
		dataType : 'json',
		scriptCharset: 'utf-8',
		data : text,
		processData : false
	    };
	    return this.sendRequest(data);
	}
	
	sendJson(json : any) : Promise<Kii.HttpResponse> {
	    return this.sendText(JSON.stringify(json));
	}

	send() : Promise<Kii.HttpResponse> {
	    var data = {
		url : this.url,
		type : this.method,
		headers : this.headers,
		dataType : 'json',
		scriptCharset: 'utf-8',
		processData : false
	    };
	    return this.sendRequest(data);
	}

	private sendRequest(data : any) : Promise<Kii.HttpResponse> {
            return new Promise<Kii.HttpResponse>((resolve : (r : Kii.HttpResponse) => void, reject : (e : Kii.HttpError) => void) => {
	        $.ajax(data).done((data_ : any, status : number, data : any) => {
		    if (data.status == 204) {
                        resolve({
                            status : data.status,
                            headers : data.getAllResponseHeaders(),
                            body : {}
                        });
		    } else {
                        resolve({
                            status : data.status,
                            headers : data.getAllResponseHeaders(),
                            body : JSON.parse(data.responseText),
                        });
		    }
		}).fail((data : any) => {
                    if (data.status == 204) {
                        resolve({
                            status : data.status,
                            headers : data.getAllResponseHeaders(),
                            body : {}
                        });
                    } else {
                        reject({
                            status : data.status,
                            code : '',
                            desc : '',
                            headers : data.getAllResponseHeaders(),
                            body : {},
                        });
                    }
		});
            });	  
	}
    }
}