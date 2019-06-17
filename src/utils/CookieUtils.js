//1.设置Cookie：

/**
 *
 a.无过期时间：（若不设置过期时间，默认为会话级Cookie，浏览器关闭就会失效）
 * @param name
 * @param value
 */
// export const setCookie = (name,value)=>{
//     document.cookie = name + '=' + escape(value);
// }

/**
 * b.固定过期时间：
 * @param name
 * @param value
 */
// export const setCookie = (name,value)=>{
//     var Days = 30;
//     var exp = new Date();
//     exp.setTime(exp.getTime() + Days*24*60*60*1000);
//     document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
// }

/**
 * 设置自定义过期时间cookie
 * @param name
 * @param value
 * @param time
 */
import store from '../store/store'
import {TOKEN} from "../store/types";
export const  setCookie = (name,value,time)=>{
    store.commit(TOKEN,value);
    var msec = getMsec(time); //获取毫秒
    var exp = new Date();
    exp.setTime(exp.getTime() + msec*1);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
};

/**
 * 将字符串时间转换为毫秒,1秒=1000毫秒
 * @param str
 * @returns {number}
 */
export const getMsec = (str)=>{
    var timeNum=str.substring(0,str.length-1)*1; //时间数量
    var timeStr=str.substring(str.length-1,str.length); //时间单位前缀，如h表示小时
    if (timeStr=="s") //20s表示20秒
    {
        return timeNum*1000;
    }
    else if (timeStr=="h") //12h表示12小时
    {
        return timeNum*60*60*1000;
    }
    else if (timeStr=="d")
    {
        return timeNum*24*60*60*1000; //30d表示30天
    }
};


/**
 * 读取Cookie：
 * @param name
 * @returns {*}
 */
export const getCookie = (name)=>{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); //正则匹配
    if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
    }
    else{
        return null;
    }

};

/**
 * 删除Cookie：
 * @param name
 */
export const delCookie = (name)=>{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null){
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    }
};