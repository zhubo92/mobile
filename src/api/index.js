import request from "@/utils/request";

/**
 * 首页轮播图
 */
export function getSlidesApi() {
  return request({
    url: `/home/slides`,
    method: "GET"
  });
}

/**
 * 首页导航栏
 */
export function getNavApi() {
  return request({
    url: `/home/nav`,
    method: "GET"
  });
}

/**
 * 首页商品
 */
export function getProductApi() {
  return request({
    url: `/home/product`,
    method: "GET"
  });
}

/**
 * 首页商品分类
 */
export function getCategoryApi() {
  return request({
    url: `/home/category`,
    method: "GET"
  });
}

/**
 * 获取图形验证码
 */
export function getCaptchaApi() {
  return request({
    url: `/user/captcha`,
    method: "GET"
  });
}

/**
 * 登录
 */
export function loginApi(data) {
  return request({
    url: `/user/login`,
    method: "POST",
    data,
    headers: {
      "Captcha-Key": sessionStorage.getItem("Captcha-Key")
    }
  });
}

/**
 * 判断是否登录
 */
export function getIsLoginApi() {
  return request({
    url: `/user/isLogin`,
    method: "GET"
  });
}

/**
 * 获取手机登录验证码
 */
export function getCodeApi(phone) {
  return request({
    url: `/user/code?phone=${phone}`,
    method: "GET"
  });
}
