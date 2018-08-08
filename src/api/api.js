import axios from 'axios';

export const Login = params => { return axios.post(`/login`, params).then(res => res.data); };
export const getUser = params => { return axios.get(`/user`, { params: params }); };
export const editUserSelf = params => { return axios.post(`/user/edit_self`, params).then(res => res.data); };
export const editPwd = params => { return axios.post(`/user/editPwd`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`/user/list`, { params: params }); };
export const deleteUser = params => { return axios.get(`/user/remove`, { params: params }); };
export const batchDeleteUser = params => { return axios.get(`/user/batchremove`, { params: params }); };
export const addUser = params => { return axios.get(`/user/add`, { params: params }); };
export const editUser = params => { return axios.get(`/user/edit`, { params: params }); };
