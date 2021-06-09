"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var formatEmailDomain_1 = __importDefault(require("./formatEmailDomain"));
function filterInvalidEmails(emailDomains, commitEmails) {
    var allowedDomainsBox = [];
    var invalidEmails = [];
    emailDomains
        .replace(/\s/g, '')
        .split(',')
        .forEach(function (email) {
        var pushedEmail = formatEmailDomain_1.default(email);
        allowedDomainsBox.push(pushedEmail);
    });
    console.log(allowedDomainsBox);
    // console.log(emailDomains);
    // const a = commitEmails.map((allowedEmailDomain) => {
    //   const b = commitEmails.filter((email) => !email.endsWith(allowedEmailDomain));
    //   {
    //     if (b) {
    //       return 'tak';
    //     } else return 'nie';
    //   }
    // });
    // console.log(a);
    var a = commitEmails.forEach(function (provideDomain) {
        // console.log(provideDomain);
        allowedDomainsBox.filter(function (email) { return !email.endsWith(provideDomain); });
        return;
    });
    console.log(a);
    //
    // invalidEmails.forEach((allowedEmailDomain) => {
    //   commitEmails.filter((email) => !email.endsWith(allowedEmailDomain));
    //   // commitEmails.filter((email2) => !email.includes(email2));
    //   // invalidEmails.push(email);
    // });
    // const currentTable = commitEmails.filter((email) => !invalidEmails.includes(email));
    // invalidEmails.push(email);
    // console.log(invalidEmails);
    return invalidEmails;
}
exports.default = filterInvalidEmails;
