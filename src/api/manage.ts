import axios from "@/utils/request";

const api = {
  user: "/api/user",
  role: "/api/role",
  service: "/api/service",
  permission: "/api/permission",
  permissionNoPager: "/api/permission/no-pager",
};

export default api;

//post
export function postAction(url: any, parameter: any) {
  return axios({
    url: url,
    method: "post",
    data: parameter,
  });
}

//post method= {post | put}
export function httpAction(url: any, parameter: any, method: any) {
  return axios({
    url: url,
    method: method,
    data: parameter,
  });
}

//put
export function putAction(url: any, parameter: any) {
  return axios({
    url: url,
    method: "put",
    data: parameter,
  });
}

//get
export function getAction(url: any, parameter: any) {
  return axios({
    url: url,
    method: "get",
    params: parameter,
  });
}

//deleteAction
export function deleteAction(url: any, parameter: any) {
  return axios({
    url: url,
    method: "delete",
    params: parameter,
  });
}

export function getUserList(parameter: any) {
  return axios({
    url: api.user,
    method: "get",
    params: parameter,
  });
}

export function getRoleList(parameter: any) {
  return axios({
    url: api.role,
    method: "get",
    params: parameter,
  });
}

export function getServiceList(parameter: any) {
  return axios({
    url: api.service,
    method: "get",
    params: parameter,
  });
}

export function getPermissions(parameter: any) {
  return axios({
    url: api.permissionNoPager,
    method: "get",
    params: parameter,
  });
}

// id == 0 add     post
// id != 0 update  put
export function saveService(parameter: any) {
  return axios({
    url: api.service,
    method: parameter.id == 0 ? "post" : "put",
    data: parameter,
  });
}

/**
 * 下载文件 用于excel导出
 * @param url
 * @param parameter
 * @returns {*}
 */
export function downFile(url: any, parameter: any) {
  return axios({
    url: url,
    params: parameter,
    method: "get",
    responseType: "blob",
  });
}

/**
 * 文件上传 用于富文本上传图片
 * @param url
 * @param parameter
 * @returns {*}
 */
export function uploadAction(url: any, parameter: any) {
  return axios({
    url: url,
    data: parameter,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data", // 文件上传
    },
  });
}

/**
 * 获取文件服务访问路径
 * @param avatar
 * @param subStr
 * @returns {*}
 */
export function getFileAccessHttpUrl(avatar: any, subStr: any) {
  if (!subStr) subStr = "http";
  if (avatar && avatar.startsWith(subStr)) {
    return avatar;
  } else {
    if (avatar && avatar.length > 0 && avatar.indexOf("[") == -1) {
      return avatar;
      // return window._CONFIG['imgaeDomianURL'] + avatar;
    }
  }
}
