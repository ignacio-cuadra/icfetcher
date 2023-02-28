"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
function fetchFactory({ baseUrl, url, params, method, headers, body, isJson, autoBodyStringfy = false, autoClearUndefinedBodyAttributes = false, mode, }) {
    if (!url)
        throw new Error("url is undefined");
    if (!params)
        params = {};
    if (!isObject(params))
        throw new Error("params must be object");
    if (!baseUrl)
        baseUrl = "";
    if (!headers)
        headers = {};
    if (!method)
        method = "GET";
    if (isJson) {
        if (headers["Content-Type"] || headers["Accept"])
            console.warn('isJson option redeclare Content-Type and Accept headers with value "application/json"');
        headers["Content-Type"] = "application/json";
        headers["Accept"] = "application/json";
    }
    if (autoClearUndefinedBodyAttributes && typeof body === "object")
        body = lodash_1.default.omitBy(body, lodash_1.default.isUndefined);
    if (autoBodyStringfy && typeof body === "object")
        body = JSON.stringify(body);
    const fullUrl = `${baseUrl}${url}?${new URLSearchParams(params)}`;
    return fetch(fullUrl, {
        method,
        headers,
        body,
        mode,
    });
}
exports.default = fetchFactory;
const isObject = (value) => {
    return typeof value === "object" && !Array.isArray(value) && value !== null;
};
//# sourceMappingURL=fetchFactory.js.map