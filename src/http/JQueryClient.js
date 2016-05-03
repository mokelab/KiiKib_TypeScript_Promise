/// <reference path="./HttpClient.ts" />
var $;
var jquery;
(function (jquery) {
    class JQueryClient {
        constructor() {
            this.headers = {};
        }
        setUrl(url) {
            this.url = url;
        }
        setMethod(method) {
            this.method = method;
        }
        setContentType(value) {
            this.setHeader('content-type', value);
        }
        setHeader(key, value) {
            this.headers[key] = value;
        }
        setKiiHeader(context, authRequired) {
            this.setHeader('x-kii-appid', context.getAppId());
            this.setHeader('x-kii-appkey', context.getAppKey());
            if (authRequired) {
                this.setHeader('authorization', 'bearer ' + context.getAccessToken());
            }
        }
        sendText(text) {
            return this.sendRequest({
                url: this.url,
                type: this.method,
                headers: this.headers,
                dataType: 'json',
                scriptCharset: 'utf-8',
                data: text,
                processData: false
            });
        }
        sendJson(json) {
            return this.sendText(JSON.stringify(json));
        }
        send() {
            return this.sendRequest({
                url: this.url,
                type: this.method,
                headers: this.headers,
                dataType: 'json',
                scriptCharset: 'utf-8',
                processData: false
            });
        }
        sendRequest(data) {
            return new Promise((resolve, reject) => {
                $.ajax(data).done((data_, status, data) => {
                    resolve(this.parseResponse(data));
                }).fail((data) => {
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
                    }
                    catch (e) {
                        code = 'UNKNOWN';
                        message = data.responseText;
                    }
                    reject({
                        status: data.status,
                        code: code,
                        message: message,
                        headers: data.getAllResponseHeaders(),
                        body: data.responseText,
                    });
                });
            });
        }
        parseResponse(data) {
            var body;
            try {
                if (data.status == 204) {
                    body = {};
                }
                else {
                    body = JSON.parse(data.responseText);
                }
            }
            catch (e) {
                body = data.responseText;
            }
            return {
                status: data.status,
                headers: data.getAllResponseHeaders(),
                body: body,
            };
        }
    }
    jquery.JQueryClient = JQueryClient;
})(jquery || (jquery = {}));
