import { defineStore } from 'pinia';

export const userLoginInfo = defineStore('loginInfo', {
    state: () => {
        return {
            userInfo: null,
            userToken: null,
            count: 0,
            age: 0,
            list: []
        };
    },
    actions: {
        abc: () => {
            const aaa = abc();
            console.log(aaa.nickName);
        }

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


export const abc = defineStore('abc', {
    state: () => {
        return {
            name: 'haha'
        };
    },
    getters: {
        nickName: (state) => {
            return state.name + '123';
        }

    }
}); 