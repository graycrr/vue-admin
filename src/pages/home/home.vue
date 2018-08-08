<template>
  <el-row class="home" style="position: absolute;">
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        {{collapsed ? '' : sysName}}
      </el-col>
      <el-col :span="10">
        <div class="tools" @click.prevent="collapse">
          <i class="fa fa-align-justify"></i>
        </div>
      </el-col>
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner"><img src="../../images/header.jpeg" />{{sysUserName}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleUser">个人信息</el-dropdown-item>
            <el-dropdown-item @click.native="handlePwd">修改密码</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleopen"
          @close="handleclose"
          @select="handleselect"
          unique-opened
          router
          v-show="!collapsed">
          <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
            <el-submenu :index="index+''" v-if="!item.leaf" v-bind:key="index">
              <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
              <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden" >{{child.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.leaf && item.children.length>0" :index="item.children[0].path" v-bind:key="index"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
          </template>
        </el-menu>
        <!--导航菜单-折叠后-->
        <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
          <li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item" v-bind:key="index">
            <template v-if="!item.leaf">
              <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i>
              </div>
              <ul class="submenu submenu-bg" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                <li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
              </ul>
            </template>
            <template v-else>
              <ul>
                <li class="el-submenu">
                  <div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
                </li>
              </ul>
            </template>
          </li>
        </ul>
      </aside>
      <section class="content-container" style="background-color: #fff">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <strong class="title">当前位置：{{$route.name}}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>

    <!--个人信息-->
    <el-dialog title="个人信息" :visible.sync="editUserVisible" :close-on-click-modal="false">
      <el-form :model="editUser" label-width="80px" :rules="editUserRules" ref="editUser">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" maxlength="150" :disabled="true" v-model="editUser.username" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="telephone">
          <el-input type="tel" maxlength="32" v-model="editUser.telephone" clearable></el-input>
        </el-form-item>
        <el-form-item label="电子邮件" prop="email">
          <el-input type="email" maxlength="254" v-model="editUser.email" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editUserVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editUserSubmit" :loading="userLoading">修改</el-button>
      </div>
    </el-dialog>

    <!--修改密码-->
    <el-dialog title="修改密码" :visible.sync="editPwdVisible" :close-on-click-modal="false">
      <el-form :model="editPwd" label-width="100px" :rules="editPwdRules" ref="editPwd">
        <el-form-item label="旧密码" prop="old_password">
          <el-input type="password" v-model="editPwd.old_password" clearable></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_password1">
          <el-input type="password" v-model="editPwd.new_password1" clearable></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="new_password2">
          <el-input type="password" v-model="editPwd.new_password2" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editPwdVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editPwdSubmit" :loading="pwdLoading">修改</el-button>
      </div>
    </el-dialog>

  </el-row>
</template>

<script>
  import { getUser, editUserSelf, editPwd } from '../../api/api';
  import mixin from '../../utils/mixin'
  export default {
    mixins: [mixin],
    data () {
      return {
        sysName: 'VUEADMIN',
        collapsed: false,
        sysUserName: '',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },

        // 个人信息
        editUserVisible: false,
        userLoading: false,
        editUser: {
          username: '',
          telephone: '',
          email: '',
        },
        editUserRules: {
          username: [
            { required: true, message: '请输入用户名（包含字母，数字和仅有的@/./+/-/_符号）', trigger: 'blur' }
          ]
        },

        // 修改密码
        editPwdVisible: false,
        pwdLoading: false,
        editPwd: {
          old_password: '',
          new_password1: '',
          new_password2: '',
        },
        editPwdRules: {
          old_password: [
            { required: true, message: '请输入旧密码', trigger: 'blur' }
          ],
          new_password1: [
            { required: true, message: '请输入新密码', trigger: 'blur' }
          ],
          new_password2: [
            { required: true, message: '请重新输入新密码', trigger: 'blur' }
          ],
        },

      }
    },
    methods: {
      onSubmit () {
        console.log('submit!')
      },
      handleopen () {
        // console.log('handleopen');
      },
      handleclose () {
        // console.log('handleclose');
      },
      handleselect: function (a, b) {
      },
      // 退出登录
      logout: function () {
        var _this = this
        this.$confirm('确认退出吗?', '提示', {
          // type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('user')
          _this.$router.push('/login')
        }).catch(() => {

        })
      },
      // 折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed
      },
      showMenu (i, status) {
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none'
      },

      // 获取个人信息
      getUser: function () {
        let para = {username: this.sysUserName}
        getUser(para).then((res) => {
          this.editUser = res.data.user;
        })
      },
      // 打开个人信息
      handleUser: function () {
        this.editUserVisible = true;
      },
      // 编辑个人信息
      editUserSubmit: function () {
        this.$refs.editUser.validate((valid) => {
          if (valid) {
            this.userLoading = true;
            let para = Object.assign({}, this.editUser);
            editUserSelf(para).then((res) => {
              this.userLoading = false;
              this.$message({
                message: '修改个人信息成功',
                type: 'success'
              });
              this.$refs['editUser'].resetFields();
              this.editUserVisible = false;
              this.editUser = res.data;
            }).catch(err=>{
              //请求失败时触发
              let errStatus = err.response.status,
                errData = err.response.data;
              this.$message.error(errData.message);
              this.$refs['editUser'].resetFields();
              this.userLoading = false;
            });
          }
        });
      },

      // 打开修改密码
      handlePwd: function () {
        this.editPwdVisible = true;
      },
      // 修改密码
      editPwdSubmit: function () {
//        this.$refs.editPwd.validate((valid) => {
//          if (valid) {
//            this.$confirm('确认修改吗？', '提示', {}).then(() => {
//              this.pwdLoading = true;
//              if(this.editPwd.new_password1 === this.editPwd.new_password2) {
//                let para = { old_password: this.editPwd.old_password, new_password:  this.editPwd.new_password2 }
//                editPwd(para).then((res) => {
//                  this.pwdLoading = false;
//                  let {message, success} = res;
//                  if(success) {
//                    this.editPwdVisible = false;
//                    this.$router.push({ path: '/login' });
//                  } else {
//                    this.$message({
//                      message: message,
//                      type: 'error'
//                    });
//                    this.$refs['editPwd'].resetFields();
//                  }
//                })
//              } else {
//                this.$message({
//                  message: '您输入的两次密码不一致！！！',
//                  type: 'error'
//                });
//                this.editPwd.new_password1 = '';
//                this.editPwd.new_password2 = '';
//                this.pwdLoading = false;
//              }
//            });
//          }
//        });
      },
    },
    mounted () {
      let username = sessionStorage.getItem('username')
      if (username) {
        username = JSON.parse(username)
        this.sysUserName = username || ''
      }
      this.getUser();
    }
  }
</script>

<style scoped lang="scss">

</style>
