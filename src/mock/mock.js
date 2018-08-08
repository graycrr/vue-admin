import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Users } from './data/user'
let _Users = Users;

export default {
    start() { //初始化函数
        let mock = new MockAdapter(axios); // 创建 MockAdapter 实例

        // reply的参数为 (status, data, headers)
        // config指前台传过来的数据
        // resolve([状态值，{返回的数据}])

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

        // 获取用户信息
        mock.onGet('/user').reply(config => {
          let {username} = config.params;
          return new Promise((resolve, reject) => {
            let user = null;
            setTimeout(()=> {
              LoginUsers.some(u => {
                if(username && u.username === username) {
                  user = JSON.parse(JSON.stringify(u));
                  user.password = undefined;
                }
              });
              resolve([200, {user: user }])
            }, 1000);
          });
        });

        //修改个人信息
        mock.onPost('/user/edit_self').reply(config => {
          let userInfo = JSON.parse(config.data);
          return new Promise((resolve, reject) => {
            let userInfo2 = null;
            setTimeout(() => {
              let hasUser = LoginUsers.some(u => {
                if(u.username === userInfo.username) {
                  userInfo2 = Object.assign({}, userInfo);
                  return true;
                }
              });
              if(hasUser) {
                resolve([200, { code:200, msg: '修改成功', data: userInfo2 }]);
              } else {
                resolve([200, { code: 500, msg: '修改失败' }]);
              }
            },1000);
          });
        });

        // 获取用户列表
        mock.onGet('/user/list').reply(confige => {
            let {page, search, page_size, sex, begin_time, end_time} = confige.params;
            let mockUsers = _Users.filter(user => {
                let birth = new Date(user.birth).getTime();
                if((search && user.name.indexOf(search) === -1 )
                  ||(sex && user.sex !== sex) || (begin_time && end_time && (birth < begin_time || birth > end_time)) ) return false;
                return true;
            });
            // 分页
            let total = mockUsers.length;
            mockUsers = mockUsers.filter((u,index) => index < page_size * page && index >= page_size * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(()=> {
                    resolve([200, {
                        users: mockUsers,
                        count: total,
                        current: page,
                    }])
                }, 1000);
            });
        });

        // 删除用户
        mock.onGet('/user/remove').reply(config => {
            let {id} = config.params;
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

        //批量删除用户
        mock.onGet('/user/batchremove').reply(config => {
          let { ids } = config.params;
          ids = ids.split(',');
          _Users = _Users.filter(u => !ids.includes(u.id));
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve([200, {
                code: 200,
                msg: '删除成功'
              }]);
            }, 500);
          });
        });

        // 新建用户
        mock.onGet('/user/add').reply(config => {
          let params = config.params;
          _Users.push(params);
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve([200,{code:200,msg:'新增成功'}])
            },500);
          })
        });

        // 编辑用户
        mock.onGet('/user/edit').reply(config => {
          let params = config.params;
          _Users.some(u => {
            if(u.id === params.id) {
              u.name = params.name;
              u.addr = params.addr;
              u.age = params.age;
              u.birth = params.birth;
              u.sex = params.sex;
              return true;
            }
          });
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve([200,{code: 200,msg:'编辑成功'}])
            },500);
          })
        });
    }
}
