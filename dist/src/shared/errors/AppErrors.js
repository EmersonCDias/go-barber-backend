"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppError = /** @class */ (function () {
    function AppError(msg, statusCode) {
        if (statusCode === void 0) { statusCode = 400; }
        this.msg = msg;
        this.statusCode = statusCode;
    }
    return AppError;
}());
exports.default = AppError;
