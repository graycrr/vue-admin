<template>
    <div class="login">
        <el-form :model="form2" :rules="rules2" ref="form2" label-width="0" class="login2">
            <h1>登录</h1>
            <el-form-item prop="username">
                <el-input type="text" prefix-icon="fa fa-user" v-model="form2.username" placeholder="账号" clearable></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="text" prefix-icon="fa fa-unlock-alt" v-model="form2.password" placeholder="密码" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click.native.prevent="handleSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'
var mock = new MockAdapter(axios);
export default {
    data () {
        return {
            form2: {
                username: '',
                password: ''
            },
            rules2: {
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit() {
            this.$refs.form2.validate(valid => {
                if(valid) {
                    axios.post('/login',this.form2).then(res => {
                        let { msg, code } = res.data;
                        console.log(msg, code)
                        if(code !== 200 ) {
                            this.$message.error(msg)
                        } else {
                            this.$message.success(msg)
                        }
                    })
                } else {
                    return false;
                }
            });
        }
    }
}
</script>
<style lang="scss">
    .login {
       width: 100%;
       height: 100%;
       display: flex;
       justify-content: center;
       align-items: center;
    }
    .login2 {
        height: 100%;
        width: 60%;
    }
</style>


