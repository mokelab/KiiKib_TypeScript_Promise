module Kii {
    export interface ServerAPI {
        execute(api : string, params : any) : Promise<ServerAPIResponse>;
    }

    export interface ServerAPIResponse {
        
    }
}