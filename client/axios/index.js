import axios from 'axios';
import { get } from './tools';
import * as config from './config';

// easy-mock数据交互
// 管理员权限获取
export const admin = () => get({url: config.MOCK_AUTH_ADMIN});

// 访问权限获取
export const guest = () => get({url: config.MOCK_AUTH_VISITOR});

export const instance = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    timeout: 30000
});

// axios拦截器
instance.interceptors.request.use(request => {
    const super_exams_token = localStorage.getItem('super_exams_token');
    if (super_exams_token) {
        request.headers['Authorization'] ='Bearer ' + super_exams_token;
    }
    return request;
});
instance.interceptors.response.use(
    response => {
        if (response.data.token) {
            localStorage.setItem('super_exams_token', response.data.token);
        }
        return response;
    },
    error => {
        if (error.message === 'UnauthorizedError' && error.response.status === 401) {
            localStorage.removeItem('super_exams_token');
        }
        return Promise.reject(error);   // 返回接口返回的错误信息
    });