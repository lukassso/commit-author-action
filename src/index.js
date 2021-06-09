"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@actions/core");
var io_1 = require("constants/io");
var env_1 = require("constants/env");
var boolean_1 = require("constants/boolean");
var getCommitEmails_1 = __importDefault(require("helpers/getCommitEmails"));
// import formatEmailDomain from 'helpers/formatEmailDomain';
var filterInvalidEmails_1 = __importDefault(require("helpers/filterInvalidEmails"));
function checkEmail() {
    return __awaiter(this, void 0, void 0, function () {
        var emailDomains, commitEmails, invalidEmails;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    emailDomains = core_1.getInput(io_1.INPUT.EMAIL_DOMAIN, { required: true });
                    core_1.info("Email domains: " + emailDomains);
                    return [4 /*yield*/, getCommitEmails_1.default(env_1.GITHUB_EVENT)];
                case 1:
                    commitEmails = _a.sent();
                    if (!commitEmails) {
                        return [2 /*return*/, core_1.warning('Could not found emails')];
                    }
                    core_1.info("Emails to check: " + commitEmails);
                    invalidEmails = filterInvalidEmails_1.default(emailDomains, commitEmails);
                    handleSetOutput(invalidEmails, emailDomains);
                    return [2 /*return*/];
            }
        });
    });
}
function handleSetOutput(invalidEmails, emailDomains) {
    var isValid = invalidEmails.length === 0;
    core_1.setOutput(io_1.OUTPUT.IS_VALID, isValid);
    if (isValid) {
        return core_1.info('Emails are valid');
    }
    var errorOnFail = core_1.getInput(io_1.INPUT.ERROR_ON_FAIL);
    var errorMessage = "Invalid emails found. Invalid emails: " + invalidEmails + ". It should be end with " + emailDomains;
    if (errorOnFail === boolean_1.FALSE) {
        core_1.warning(errorMessage);
    }
    else {
        throw Error(errorMessage);
    }
}
checkEmail().catch(function (error) {
    core_1.setFailed(error.message);
});
exports.default = checkEmail;
