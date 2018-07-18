import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Users } from './data/user'
let _Users = Users;

export default {
    start() {
        let mock = new MockAdapter(axios);

        // reply的参数为 (status, data, headers) 
        // mock success request
        mock.onGet('/success').reply(200, {
            msg: 'success'
        });

        // mock error request
        mock.onGet('/error').reply(500, {
            msg: 'failure'
        });

        //登录
        mock.onPost('/login').reply(config => {
            let {username, password} = JSON.parse(config.data);
            return new Promise((resolve, reject) => {
                let user = null;
                setTimeout(() => {
                    let hasUser = LoginUsers.some(u => {
                        if(u.username === username && u.password === password) {
                            user= JSON.parse(JSON.stringify(u));
                            user.password = undefined;
                            return true;
                        }
                    });
                    if(hasUser) {
                        resolve([200, { code:200, msg: '登录成功', user }]);
                    } else {
                        resolve([200, { code: 500, msg: '账号或者密码错误' }]);
                    }
                },1000);
            });
        });

        // 获取用户列表
        mock.onGet('/user/list').reply(confige => {
            let {name} = confige.params;
            let mockUsers = _Users.filter(user => {
                if(name && user.name.indexOf(name) == -1) return false;
                return true;
            });
            return new Promise((resolve, reject) => {
                setTimeout(()=> {
                    resolve([200, {
                        users: mockUsers
                    }])
                }, 1000);
            });
        });

        //获取用户列表（分页）
        mock.onGet('/user/listpage').reply(confige => {
            let {page, name} = config.params;
            let mockUsers = _Users.filter(user => {
                if(name && user.name.indexOf(name) == -1) return false;
                return true;
            });
            let total = mockerUsers.length;
            mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        total: total,
                        users: mockUsers
                    }])
                }, 1000);
            })
        });

        // 删除用户
        mock.onGet('/user/remove').reply(config => {
            let {id} = confige.params;
            _Users = _Users.filter(u => u.id !== id);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });
    }
}