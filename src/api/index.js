import request from '../utils/request';

const baseUrl = process.env.VUE_APP_BASE_URL;
const baseUrl2 = process.env.VUE_APP_BASE_URL2;

//获得车辆详情
export function getCarInfo() {
    return request({
        url: baseUrl + 'car-info/list',
        method: 'post',
        params: {limit: 10000, page: 1, ocupy: false}
    });
}

//提交用车申请
export function createApply(data) {
    return request({
        headers:
            {
                'Content-Type': 'application/json'
            },
        url: baseUrl + 'car-apply/createApply',
        method: 'post',
        data: JSON.stringify(data)
    });

}//图片上传
export function uploadImg(file) {
    const param = new FormData();
    param.append("file", file.file);
    return request({
        headers:
            {
                'Content-Type': 'multipart/form-data'
            },
        url: baseUrl + 'file/local-upload',
        method: 'post',
        data: param
    });
}

//获取所有人员
export function ddapprover() {
    return request({
        url: baseUrl + 'dd-user/getUsers',
        method: 'get'
    });
}

//获取所有人员
export function getDDid(code) {
    return request({
        url: 'login',
        method: 'get'
    });
}
