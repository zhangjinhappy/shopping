/**
 * 格式化需要的时间
 * @param times
 * @returns {string} 2019-4-8
 */
import {isNull} from "./Is";

export const formatDate = function(times){
    let date = new Date(times);
    return date.getFullYear()+"-"+(date.getMonth()+1) + "-" + date.getDate();
};

/**
 * 格式化需要的时间
 * @param times
 * @returns {string} 2019-4-8
 */
export const thisFormatDate = function(){
    let date = new Date();
    return date.getFullYear()+"-"+(date.getMonth()+1) + "-" + date.getDate();
};

/**
 *
 * @param times
 * @returns {string} 2019-4-8 16:04
 */
export const formatDateTime = function(times){
    let date = new Date(times);
    return date.getFullYear()+"-"+(date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":"+date.getMinutes();
};

/**
 *
 * @param times
 * @returns {string} 返回当前时间2019-4-8 16:04
 */
export const thisFormatDateTime = function(){
    let date = new Date();
    return date.getFullYear()+"-"+(date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":"+date.getMinutes();
};

/**
 * 判断两个日期相差
 * @param sDate1
 * @param sDate2
 * @returns {number | *}
 */
export const datedifference = function(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式
    var dateSpan,iDays;
    sDate1 = Date.parse(sDate1);
    sDate2 = Date.parse(sDate2);
    dateSpan = sDate2 - sDate1;
    dateSpan = Math.abs(dateSpan);
    iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
    return iDays
};

/**
 * 返回前一天日期
 * @returns {Date}
 */
export const preDate = function () {
    return new Date(new Date().getTime() - 24*60*60*1000); //前一天
};
/**
 * 返回后一天的日期
 * @returns {Date}
 */
export const nextDate  = function(){
    return new Date(new Date().getTime() + 24*60*60*1000); //后一天;
};

/**
 * 返回后N天的日期
 * @param n
 * @returns {Date}
 */
export const nextNDate  = function(n){
    return new Date(new Date().getTime() + 24*60*60*1000*n); //后一天;
};

/**
 * 返回星期几
 * @param date
 * @returns {string}
 */
export const getWeekDate = function (date) {
    let now;
    if(isNull(date)){
        now = new Date();
    }else{
        now = new Date(date);
    }
    let day = now.getDay();
    let weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    let week = weeks[day];
    return week;
};