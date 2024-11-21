import { defineStore } from 'pinia';

export const userLoginInfo = defineStore('loginInfo', {
    state: () => {
        return {
            userInfo: null,
            userToken: null
        };
    },
    persist: {
        //这里储存默认使用的是session
        enabled: true,
        strategies: [
            {
                key: 'userToken',
                storage: localStorage,
                paths: ['userToken']
            },
            {
                key: 'userInfo',
                storage: localStorage,
                paths: ['userInfo']
            },
        ]
    }
});
