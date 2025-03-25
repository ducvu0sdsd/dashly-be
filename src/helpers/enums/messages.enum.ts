
export enum SuccessMessages {
    COMPLETE_SIGNUP_STEP1 = 'COMMON.MESSAGE.SUCCESS.SIGNUP_STEP_1',
    COMPLETE_SIGNUP_STEP2 = 'COMMON.MESSAGE.SUCCESS.SIGNUP_STEP_2',
    COMPLETE_SIGNUP_STEP3 = 'COMMON.MESSAGE.SUCCESS.SIGNUP_STEP_3',
    RESEND_OTP = "COMMON.MESSAGE.SUCCESS.SIGNUP_RESEND_OTP",
    COMPLETE_SIGNIN = 'COMMON.MESSAGE.SUCCESS.SIGNIN'
}

export enum FailMessages {
    COMMON = 'COMMON.MESSAGE.FAIL.COMMON_FAIL',
    FOUND_USER = 'COMMON.MESSAGE.FAIL.USER_FOUND',
    NOT_FOUND_USER = 'COMMON.MESSAGE.FAIL.USER_NOT_FOUND',
    UPDATE_FAIL = 'COMMON.MESSAGE.FAIL.UPDATE_FAILED',
    INVALID_OTP = 'COMMON.MESSAGE.FAIL.INVALID_OTP',
    INVALID_PASSWORD = 'COMMON.MESSAGE.FAIL.INVALID_PASSWORD',
}