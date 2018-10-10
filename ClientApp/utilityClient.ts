/* tslint:disable */

import { SwaggerException } from "./swaggerException";
import "promise-polyfill/src/polyfill";
import "whatwg-fetch";

export interface IUtilityClient {
    getDisplayContent(utilityName: string | null, configuration: string | null, utilityRequest: UtilityRequest | null): Promise<UtilityResponce | null>;
    executeAction(utilityName: string | null, configuration: string | null, utilityRequest: UtilityRequest | null): Promise<UtilityResponce | null>;
}

export class UtilityClient implements IUtilityClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : <any>window;
        this.baseUrl = baseUrl ? baseUrl : "http://";
    }

    getDisplayContent(utilityName: string | null, configuration: string | null, utilityRequest: UtilityRequest | null): Promise<UtilityResponce | null> {
        let url_ = this.baseUrl + "test/GetTaskByProjectUID/{guid}";
        if (utilityName === undefined || utilityName === null)
            throw new Error("The parameter 'utilityName' must be defined.");
        url_ = url_.replace("{utilityName}", encodeURIComponent("" + utilityName)); 
        if (configuration === undefined || configuration === null)
            throw new Error("The parameter 'configuration' must be defined.");
        url_ = url_.replace("{configuration}", encodeURIComponent("" + configuration)); 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(utilityRequest);

        let options_ = <RequestInit>{
            body: content_,
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetDisplayContent(_response);
        });
    }

    protected processGetDisplayContent(response: Response): Promise<UtilityResponce | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? UtilityResponce.fromJS(resultData200) : <any>null;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return SwaggerException.throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<UtilityResponce | null>(<any>null);
    }

    executeAction(utilityName: string | null, configuration: string | null, utilityRequest: UtilityRequest | null): Promise<UtilityResponce | null> {
        let url_ = this.baseUrl + "/api/Utility/ExecuteAction/{utilityName}/{configuration}";
        if (utilityName === undefined || utilityName === null)
            throw new Error("The parameter 'utilityName' must be defined.");
        url_ = url_.replace("{utilityName}", encodeURIComponent("" + utilityName)); 
        if (configuration === undefined || configuration === null)
            throw new Error("The parameter 'configuration' must be defined.");
        url_ = url_.replace("{configuration}", encodeURIComponent("" + configuration)); 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(utilityRequest);

        let options_ = <RequestInit>{
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processExecuteAction(_response);
        });
    }

    protected processExecuteAction(response: Response): Promise<UtilityResponce | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? UtilityResponce.fromJS(resultData200) : <any>null;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return SwaggerException.throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<UtilityResponce | null>(<any>null);
    }
}

export class UtilityResponce implements IUtilityResponce {
    kind?: string | undefined;
    value?: string | undefined;
    binaryValue?: string | undefined;
    nonce?: string | undefined;

    constructor(data?: IUtilityResponce) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.kind = data["kind"];
            this.value = data["value"];
            this.binaryValue = data["binaryValue"];
            this.nonce = data["nonce"];
        }
    }

    static fromJS(data: any): UtilityResponce {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityResponce();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["kind"] = this.kind;
        data["value"] = this.value;
        data["binaryValue"] = this.binaryValue;
        data["nonce"] = this.nonce;
        return data; 
    }
}

export interface IUtilityResponce {
    kind?: string | undefined;
    value?: string | undefined;
    binaryValue?: string | undefined;
    nonce?: string | undefined;
}

export class UtilityRequest implements IUtilityRequest {
    repositoryName?: string | undefined;
    loginName?: string | undefined;
    siteId: string;
    siteUrl?: string | undefined;
    webId: string;
    listId: string;
    itemID: number;
    listItemId: string;
    utilityName?: string | undefined;
    configuration?: string | undefined;
    projectUid: string;
    filter?: string | undefined;
    userInput?: string | undefined;
    queryParameter?: KeyValuePairOfStringAndString[] | undefined;
    formParameter?: KeyValuePairOfStringAndString[] | undefined;
    meassure: boolean;
    nonce?: string | undefined;

    constructor(data?: IUtilityRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.repositoryName = data["repositoryName"];
            this.loginName = data["loginName"];
            this.siteId = data["siteId"];
            this.siteUrl = data["siteUrl"];
            this.webId = data["webId"];
            this.listId = data["listId"];
            this.itemID = data["itemID"];
            this.listItemId = data["listItemId"];
            this.utilityName = data["utilityName"];
            this.configuration = data["configuration"];
            this.projectUid = data["projectUid"];
            this.filter = data["filter"];
            this.userInput = data["userInput"];
            if (data["queryParameter"] && data["queryParameter"].constructor === Array) {
                this.queryParameter = [];
                for (let item of data["queryParameter"])
                    this.queryParameter.push(KeyValuePairOfStringAndString.fromJS(item));
            }
            if (data["formParameter"] && data["formParameter"].constructor === Array) {
                this.formParameter = [];
                for (let item of data["formParameter"])
                    this.formParameter.push(KeyValuePairOfStringAndString.fromJS(item));
            }
            this.meassure = data["meassure"];
            this.nonce = data["nonce"];
        }
    }

    static fromJS(data: any): UtilityRequest {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["repositoryName"] = this.repositoryName;
        data["loginName"] = this.loginName;
        data["siteId"] = this.siteId;
        data["siteUrl"] = this.siteUrl;
        data["webId"] = this.webId;
        data["listId"] = this.listId;
        data["itemID"] = this.itemID;
        data["listItemId"] = this.listItemId;
        data["utilityName"] = this.utilityName;
        data["configuration"] = this.configuration;
        data["projectUid"] = this.projectUid;
        data["filter"] = this.filter;
        data["userInput"] = this.userInput;
        if (this.queryParameter && this.queryParameter.constructor === Array) {
            data["queryParameter"] = [];
            for (let item of this.queryParameter)
                data["queryParameter"].push(item.toJSON());
        }
        if (this.formParameter && this.formParameter.constructor === Array) {
            data["formParameter"] = [];
            for (let item of this.formParameter)
                data["formParameter"].push(item.toJSON());
        }
        data["meassure"] = this.meassure;
        data["nonce"] = this.nonce;
        return data; 
    }
}

export interface IUtilityRequest {
    repositoryName?: string | undefined;
    loginName?: string | undefined;
    siteId: string;
    siteUrl?: string | undefined;
    webId: string;
    listId: string;
    itemID: number;
    listItemId: string;
    utilityName?: string | undefined;
    configuration?: string | undefined;
    projectUid: string;
    filter?: string | undefined;
    userInput?: string | undefined;
    queryParameter?: KeyValuePairOfStringAndString[] | undefined;
    formParameter?: KeyValuePairOfStringAndString[] | undefined;
    meassure: boolean;
    nonce?: string | undefined;
}

export class KeyValuePairOfStringAndString implements IKeyValuePairOfStringAndString {
    key?: string | undefined;
    value?: string | undefined;

    constructor(data?: IKeyValuePairOfStringAndString) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.key = data["key"];
            this.value = data["value"];
        }
    }

    static fromJS(data: any): KeyValuePairOfStringAndString {
        data = typeof data === 'object' ? data : {};
        let result = new KeyValuePairOfStringAndString();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["key"] = this.key;
        data["value"] = this.value;
        return data; 
    }
}

export interface IKeyValuePairOfStringAndString {
    key?: string | undefined;
    value?: string | undefined;
}
