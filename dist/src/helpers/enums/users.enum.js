"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeAccounts = exports.ProcessSignups = exports.Genders = exports.Roles = void 0;
var Roles;
(function (Roles) {
    Roles["ADMIN"] = "admin";
    Roles["USER"] = "user";
})(Roles || (exports.Roles = Roles = {}));
var Genders;
(function (Genders) {
    Genders["MALE"] = "male";
    Genders["FEMALE"] = "female";
    Genders["OTHER"] = "OTHER";
})(Genders || (exports.Genders = Genders = {}));
var ProcessSignups;
(function (ProcessSignups) {
    ProcessSignups["STEP1"] = "Created Username and Password";
    ProcessSignups["STEP2"] = "Authenticated Email";
    ProcessSignups["STEP3"] = "Completed Information";
})(ProcessSignups || (exports.ProcessSignups = ProcessSignups = {}));
var TypeAccounts;
(function (TypeAccounts) {
    TypeAccounts["NORMAL"] = "Username and Password";
    TypeAccounts["GOOGLE"] = "Google Account";
})(TypeAccounts || (exports.TypeAccounts = TypeAccounts = {}));
