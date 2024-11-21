import { defineStore } from "pinia";
export const userLoginInfo = defineStore("loginInfo", {
    state: () => {
        return {
            userInfo: null,
            userToken: null
        };
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: "userToken",
                storage: localStorage,
                paths: ['userToken']
            }
        ]
    },
});