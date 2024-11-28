<template>
    <page-view class="flex-column">
        <div class="go-back flex-row a-c">
            <van-icon name="arrow-left" size=".25rem" color="#666" @click="router.back()" />
        </div>
        <div class="login-form flex-1 flex-column a-c">
            <h2>小叮当外卖</h2>
            <ul class="login-tab flex-row">
                <li @click="tabChange = 1">
                    <span :class="{ active: tabChange == 1 }">短信登录</span>
                </li>
                <li @click="tabChange = 2">
                    <span :class="{ active: tabChange == 2 }">密码登录</span>
                </li>
            </ul>
            <div class="message-login" v-show="tabChange == 1">
                <input type="text" class="login-user" placeholder="手机号" v-model="loginInfo.tell">
                <input type="text" class="login-pass" placeholder="验证码" v-model="loginInfo.mark1">
                <p>温馨提示：未注册小叮当外卖的手机号，登录时将自动注册，且代表已经同意</p>
                <button type="button">登录</button>
                <div class="yzm" @click="regPhone">获取验证码</div>
            </div>
            <div class="password-login" v-show="tabChange == 2">2</div>
        </div>
    </page-view>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { reactive, ref, watch } from 'vue';
import { yzm } from '@/utils/api';
import { showNotify } from 'vant';


const tabChange = ref(1);
const router = useRouter();
const loginInfo = reactive({
    tell: '',
    mark1: ''
});
const yzmCode = ref(0);
const regPhone = async () => {

    // console.log(1);
    if (loginInfo.tell[0] == 1 && loginInfo.tell.length == 11 && Number(loginInfo.tell) + '' != 'NaN') {

        yzmCode.value = (await yzm()).code;
        loginInfo.mark1 = yzmCode.value;
    } else {
        console.log(1);
        showNotify({ message: '手机号格式不正确', type: 'danger' });
    }
};

</script>

<style lang="scss" scoped>
.active {
    color: #4EB3FC;
    border-bottom: 3px solid #4EB3FC;
    padding-bottom: .05rem;
}

.go-back {
    height: .5rem;
    padding-left: .2rem;
}

.login-form {
    h2 {
        font-size: .38rem;
        color: #4EB3FC;
        padding: .4rem 0 .5rem 0;
    }

    .login-tab {
        width: 60%;

        li {
            flex: 2;
            text-align: center;
        }
    }

    .message-login {
        margin-top: .1rem;
        position: relative;

        .yzm {
            position: absolute;
            top: 0.1rem;
            right: 15%;
            line-height: .44rem;
            color: #4EB3FC;
        }

        input {
            box-sizing: border-box;
            width: 80%;
            margin: .1rem 10%;
            height: .44rem;
            border-radius: 5px;
            border: 1px solid #ccc;
            padding: 0 35% 0 5%;
        }

        p {
            font-size: .14rem;
            line-height: .20rem;
            color: #666;
            padding: 0 10%;
            margin-bottom: .3rem;
        }

        button {
            background-color: #4CD96F;
            border: none;
            width: 80%;
            height: .4rem;
            margin: 0 10%;
            border-radius: 6px;
            color: #fff;
        }
    }
}
</style>