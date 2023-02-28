"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(response) {
        super("Http Exception");
        this.response = response;
    }
}
exports.default = HttpException;
//# sourceMappingURL=HttpException.js.map