"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AT_SIGN = '@';
function formatEmailDomain(value) {
    return value.startsWith(AT_SIGN) ? value : "" + AT_SIGN + value;
}
exports.default = formatEmailDomain;
