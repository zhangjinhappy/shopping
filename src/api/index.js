import axios from 'axios';
import {OCUSTID} from '../types';

 //axios.defaults.baseURL = 'http://javautil.top';//设置默认的基本路径
 axios.defaults.baseURL = 'http://mallmanage.zybkeji.com';//设置默认的基本路径
 //axios.defaults.baseURL = 'http://192.168.0.103:8082';//设置默认的基本路径
  axios.interceptors.response.use((res)=>{
        return res.data;
    });
axios.interceptors.request.use((config)=>{
    // Indicator.open();//请求提示
    config.headers[OCUSTID] = localStorage.getItem("oCustID");
    return config;
});
export let post = (url,data) =>{
    return axios.post(url,data);
};
export let get = (url) =>{
    return axios.get(url);
};
export let put = (url,data) =>{
    return axios.put(url,QS.stringify(data));
};

export let deleteData = (url) => {
    return axios.delete(url);
};
