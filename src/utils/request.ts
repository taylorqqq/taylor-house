import axios from "axios";
import { ElNotification } from "element-plus";

const errorHandle = (state: any, info: any) => {
  switch (state) {
    case 401:
      ElNotification.error({
        title: "系统消息",
        message: "未授权，请重新登录",
      });
      break;
    case 403:
      ElNotification.error({
        title: "系统消息",
        message: "拒绝访问",
      });
      break;
    case 404:
      ElNotification.error({
        title: "系统消息",
        message: "请求错误，未找到该资源",
      });
      break;
    case 500:
      ElNotification.error({
        title: "系统消息",
        message: "系统异常",
      });
      console.log("系统异常");
      break;
    case 504:
      ElNotification.error({
        title: "系统消息",
        message: "网络超时",
      });
      console.log("网络超时");
      break;
    default:
      ElNotification.error({
        title: "系统消息",
        message: info,
      });
      break;
  }
};

// const apiBaseUrl = "http://localhost:4000";
const apiBaseUrl = "/api";

const instance = axios.create({
  // 网络请求的公共配置
  baseURL: apiBaseUrl, // api base_url
  timeout: 600000, // 请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    if (config.method === "post") {
      config.data = JSON.stringify(config.data);
    }
    if (window.localStorage.getItem("token")) {
      config.headers.common["token"] = window.localStorage.getItem("token");
    }
    config.headers["Content-Type"] = "application/json";
    // config 是一个对象，包含了请求的所有配置信息
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.status === 200 ? response.data : Promise.reject(response);
  },
  (error) => {
    // 对响应错误做点什么
    const { response } = error;
    errorHandle(response.status, response.info);
  }
);
export default instance;
