//正则表达式

/*
* 验证url的
* */
export const R_parse_url =  /^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/;

/**
 * 验证手机号的
 * @type {RegExp}
 */
export const R_parse_PhoneNumber= /^1[3456789]\d{9}$/;

/**
 * 验证中文姓名
 * @type {RegExp}
 */
export const R_parse_nameReg = /^[\u4e00-\u9fa5]+·[\u4e00-\u9fa5]+|[\u4e00-\u9fa5]+$/;

/**
 * 验证密码的
 * @type {RegExp}
 */
export const R_parse_PassWord = /^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/;

/**
 * 验证身份证的(简单版)
 *
 * @type {RegExp}
 */
export const R_parse_IDCard = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i ;

