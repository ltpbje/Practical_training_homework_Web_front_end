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
                <button type="button" class="login-btn" @click="messageLoginCheck(loginInfo)">登录</button>
                <button class="yzm" @click="regPhone" :disabled="flag">
                    <span v-if="!flag">获取验证码</span>
                    <span v-else>{{ countNum }}秒</span>
                </button>
            </div>
            <div class="password-login" v-show="tabChange == 2">
                <input type="text" placeholder="账号">
                <input type="password" placeholder="密码">
                <input type="text" placeholder="验证码">
                <button class="login-btn">登录</button>
                <div id="v-container"></div>
            </div>
        </div>
    </page-view>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { reactive, ref, onMounted } from 'vue';
import { yzm, messageLogin } from '@/utils/api';
import { showNotify } from 'vant';
import { serverAddress } from '@/stores/server';
import { GVerify } from '@/utils/GVerify';

onMounted(() => {
    new GVerify('v-container');
});
const store = serverAddress();
const tabChange = ref(1);
const router = useRouter();
const flag = ref(false);
const loginInfo = reactive({
    tell: '',
    mark1: ''
});
let checkLoginInfo = {
    tell: '',
    mark1: ''
};
const yzmCode = ref(0);
const countNum = ref(31);
//在获取验证码之后的倒计时方法中，当倒计时完毕时把checkLoginInfo中的mark1赋值为0，表示之前的验证码已经过期;
const countDown = () => {
    countNum.value--;
    if (countNum.value >= 0) {
        setTimeout(countDown, 1000);
    } else {
        countNum.value = 31;
        flag.value = false;
        checkLoginInfo.mark1 = 0;
    }
};
const regPhone = async () => {

    // console.log(1);
    if (loginInfo.tell[0] == 1 && loginInfo.tell.length == 11 && Number(loginInfo.tell) + '' != 'NaN') {
        flag.value = true;
        yzmCode.value = (await yzm()).code;
        loginInfo.mark1 = yzmCode.value;
        checkLoginInfo = { ...loginInfo }; //新增这句用来记录当此获取的手机号与验证码
        countDown();
    } else {
        console.log(1);
        showNotify({ message: '手机号格式不正确', type: 'danger' });
    }
};
store.$subscribe((mutations, state) => {
    localStorage.setItem('userToken', state.userToken);
});
//在发送登录请求的方法中添加一个判断，这个判断有三个可执行方向
//1、在验证码有效期内，判断表单中输入的手机号与验证码是否与checkLoginInfo中的记录一致，如果一致直接发送登录请求;
//2、判断checkLoginInfo中的 mark1的值是否为0，如果为0就表示验证码已经过期需要重新获取
//3、表单中的手机号与验证码与checkLoginInfo中记录的不一致，提示用户验证码或手机号错误
const messageLoginCheck = async (loginInfo) => {
    if (checkLoginInfo.tell == loginInfo.tell && checkLoginInfo.mark1 == loginInfo.mark1 && loginInfo.tell != '') {
        store.userToken = (await messageLogin(loginInfo)).token;
    } else if (checkLoginInfo.mark1 === 0) {
        showNotify({ message: '验证码过期', type: 'warning' });
    } else {
        showNotify({ message: '手机号或验证码错误', type: 'danger' });
    }
}

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

    .message-login,
    .password-login {
        margin-top: .1rem;
        position: relative;

        .yzm {
            position: absolute;
            top: 0.1rem;
            right: 15%;
            line-height: .44rem;
            color: #4EB3FC;
            background-color: transparent;
            border: none;
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

        .login-btn {
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