"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApikey = exports.setApikey = void 0;
let apikey;
function setApikey(newApikey) {
    apikey = newApikey;
}
exports.setApikey = setApikey;
function getApikey() {
    return apikey;
}
exports.getApikey = getApikey;
//# sourceMappingURL=ApiKey.js.map