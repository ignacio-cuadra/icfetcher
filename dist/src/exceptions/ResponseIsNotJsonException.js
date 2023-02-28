"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseIsNotJsonException extends Error {
    constructor(response) {
        super("Response Is Not Json Exception");
        this.response = response;
    }
}
exports.default = ResponseIsNotJsonException;
//# sourceMappingURL=ResponseIsNotJsonException.js.map