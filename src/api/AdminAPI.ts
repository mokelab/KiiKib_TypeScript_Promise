///<reference path="../model/KiiServerCode.ts"/>
module Kii {
    export interface AdminAPI {
        getAppInfo() : Promise<any>;

        getServerCodeList() : Promise<Array<KiiServerCode>>;
        uploadServerCode(code : string) : Promise<string>;
        downloadServerCode(versionId : string) : Promise<string>;
        setCurrentServerCode(versionId : string) : Promise<boolean>;
        deleteServerCode(versionId : string) : Promise<boolean>
    }
}