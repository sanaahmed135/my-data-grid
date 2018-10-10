export class SwaggerException extends Error {
    public message: string;
    public status: number; 
    public response: string; 
    public headers: { [key: string]: any; };
    public result: any; 

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    public static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
    
    public static throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
        if(result !== null && result !== undefined)
            throw result;
        else
            throw new SwaggerException(message, status, response, headers, null);
    }
}

