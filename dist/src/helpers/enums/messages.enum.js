"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailMessages = exports.SuccessMessages = void 0;
var SuccessMessages;
(function (SuccessMessages) {
    SuccessMessages["COMPLETE_SIGNUP_STEP1"] = "COMMON.MESSAGE.SUCCESS.SIGNUP_STEP_1";
    SuccessMessages["COMPLETE_SIGNUP_STEP2"] = "COMMON.MESSAGE.SUCCESS.SIGNUP_STEP_2";
    SuccessMessages["COMPLETE_SIGNUP_STEP3"] = "COMMON.MESSAGE.SUCCESS.SIGNUP_STEP_3";
    SuccessMessages["RESEND_OTP"] = "COMMON.MESSAGE.SUCCESS.SIGNUP_RESEND_OTP";
    SuccessMessages["COMPLETE_SIGNIN"] = "COMMON.MESSAGE.SUCCESS.SIGNIN";
})(SuccessMessages || (exports.SuccessMessages = SuccessMessages = {}));
var FailMessages;
(function (FailMessages) {
    FailMessages["COMMON"] = "COMMON.MESSAGE.FAIL.COMMON_FAIL";
    FailMessages["FOUND_USER"] = "COMMON.MESSAGE.FAIL.USER_FOUND";
    FailMessages["NOT_FOUND_USER"] = "COMMON.MESSAGE.FAIL.USER_NOT_FOUND";
    FailMessages["UPDATE_FAIL"] = "COMMON.MESSAGE.FAIL.UPDATE_FAILED";
    FailMessages["INVALID_OTP"] = "COMMON.MESSAGE.FAIL.INVALID_OTP";
    FailMessages["INVALID_PASSWORD"] = "COMMON.MESSAGE.FAIL.INVALID_PASSWORD";
})(FailMessages || (exports.FailMessages = FailMessages = {}));
