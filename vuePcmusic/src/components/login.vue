<template>
    <div class="login_mask">
        <div class="loginer">
            <button class='phoneInBtn' @click='phoneIn'></button>
            <button class='registerBtn' @click='register'></button>
            <button class='off' @click='off'></button>
            <button class='back' @click='back'></button>
        </div>
        <div class="input" v-show='show'>
            <input type="text" placeholder='请输入手机号' class='phoneNum'>
            <input type="password" placeholder='请输入密码' class='password'>
            <button class='sureIn' @click="sureIn"></button>
            <button class='off' @click='off'></button>
            <button class='back'@click='back'></button>
            <span v-show='tip' class='tip'></span>
        </div>
        <div class="register" v-show='show2'>
            <input type="text" placeholder='请输入手机号'>
            <input type="password" placeholder='设置登录密码,不少于6位'>
            <button class='sureOn'  @click="sureOn"></button>
            <button class='off' @click='off'></button>
            <button class='back'@click='back'></button>
        </div>
    </div>
</template>

<script>
import http from '../utils/http'
import api from '../utils/api'
export default {
    data() {
        return {
            show: false,
            show2: false,
            tip:false,
            userMess:{}
        }
    },
    methods: {
        phoneIn() {
            this.show = true
        },
        register() {
            this.show2 = true
        },
        off() {
            this.$emit('offLogin')
        },
        back() {
            this.show = false
            this.show2 = false
        },
        sureIn() {
            if($('.input .phoneNum').val() == '' || $('.input .password').val() == '') {
                this.tip = true
                $('.tip').html('不能为空')
            } else if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test($('.input .phoneNum').val()))){
                this.tip = true
                $('.tip').html('手机或密码格式不正确')
            } else{
                this.fetchData($('.input .phoneNum').val(),$('.input .password').val())
            }
        },
        sureOn() {
            alert('暂不支持注册')
            this.$emit('offLogin')
        },
        fetchData: async function(data1,data2) {
            let that = this
            let params = {phone:data1,password:data2}
            const res = await http.get(api.login, params)
            if(res && res.data.loginType === 1 && res.data.code === 200) {
                that.tip = false
                that.userMess = {nickname: res.data.profile.nickname,avatarUrl:res.data.profile.avatarUrl,userid:res.data.profile.userId}
                that.$root.bus.$emit('userMess',that.userMess)

                if(!this.tip) {
                    this.$emit('offLogin')
                }
            } else if(res && res.data.code === 502) {
                that.tip = true
                $('.tip').html('密码错误')

                if(!this.tip) {
                    this.$root.bus.$emit('loginIN')
                    this.$emit('offLogin')
                }
            }
        }
    }
}
</script>

<style>
button {
    border:none;
    background: none;
    outline:none;
    cursor: pointer;
}
input {
    border:none;
    background:none;
    outline:none;
}
.login_mask {
	position:fixed;
	top:0;
    bottom:0;
	left:0;
	right:0;
	width:100%;
	height:100%;
	background:rgba(0,0,0,0.2);
    z-index:999999;
}
.login_mask>div {
	width:350px;
	height:500px;
	background: url('../common/images/login.png');
    position:absolute;
    left:50%;
    top:50%;
    margin:-250px 0 0 -175px;
}

.login_mask>.loginer>button {
    width:260px;
    height:40px;
    position:absolute;
    left:45px;
}
.login_mask>.loginer>.phoneInBtn {
    top:203px;
}
.login_mask>.loginer>.registerBtn {
    top:253px;
}
.login_mask>.loginer>.off {
    width:40px;
    height:40px;
    position:absolute;
    top:0;
    left:310px;
}
.login_mask>.loginer>.back {
    width:100px;
    height:30px;
    position:absolute;
    top:0;
    left:0;
}

.login_mask>.input {
    background: url('../common/images/input.png');
}
.login_mask>.input>input {
    width:258px;
    height:38px;
    position:absolute;
    left:45px;
}
.login_mask>.input>input:nth-of-type(1) {
    width:200px;
    top:203px;
    padding-left:60px;
    padding-top:3px;
}
.login_mask>.input>input:nth-of-type(2) {
    top:244px;
    padding-left:30px;
}
.login_mask>.input>.sureIn {
    width:260px;
    height:40px;
    position:absolute;
    bottom: 138px;
    left:45px;
}
.login_mask>.input>.off {
    width:40px;
    height:40px;
    position:absolute;
    top:0;
    left:310px;
}
.login_mask>.input>.back {
    width:100px;
    height:30px;
    position:absolute;
    top:0;
    left:0;
}
.login_mask>.input>span {
    position:absolute;
    top:293px;
    right:5px;
    font-size:12px;
    color:red;
}

.login_mask>.register {
    background: url('../common/images/register.png');
}
.login_mask>.register>input {
    width:258px;
    height:38px;
    position:absolute;
    left:45px;
}
.login_mask>.register>input:nth-of-type(1) {
    width:200px;
    top:203px;
    padding-left:60px;
    padding-top:3px;
}
.login_mask>.register>input:nth-of-type(2) {
    top:244px;
    padding-left:30px;
}
.login_mask>.register>.sureOn {
    width:260px;
    height:40px;
    position:absolute;
    bottom: 138px;
    left:45px;
}
.login_mask>.register>.off {
    width:40px;
    height:40px;
    position:absolute;
    top:0;
    left:310px;
}
.login_mask>.register>.back {
    width:100px;
    height:30px;
    position:absolute;
    top:0;
    left:0;
}
</style>
