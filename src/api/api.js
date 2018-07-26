import axios from 'axios';

export const Login = params => { return axios.post(`/login`, params).then(res => res.data); };
export const getUserList = params => { return axios.get(`/user/list`, { params: params }); }