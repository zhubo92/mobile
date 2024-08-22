import axios from "axios";
import { showToast } from "vant";
import { httpCodeEnum } from "@/utils/enums.js";

const request = axios.create({
  baseURL: "/api",
  timeout: 5000
});

/**
 * 请求拦截
 */
request.interceptors.request.use(
  (config) => {
    // 统一的请求头设置
    config.headers["Authorization"] = localStorage.getItem("token");
    config.headers["Content-Type"] = "application/json;charset=utf-8";

    return config;
  },
  (error) => {
    // 请求错误统一处理
    console.log(error, "Request Error");

    showToast(error || "Request Error");

    return Promise.reject(error);
  }
);

/**
 *  响应拦截
 */
request.interceptors.response.use(
  async (response) => {
    const { status, msg } = response.data;

    if (status !== httpCodeEnum.OK) {
      showToast(msg || "未知错误");
    }

    return { ...response.data };
  },
  (error) => {
    console.log(error, "Response Error");

    showToast(error || "Response Error");

    return Promise.reject(error);
  }
);

export default request;
