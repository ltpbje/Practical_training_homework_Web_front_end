import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const serverAddress = defineStore('serverAddress', {
  state: () => {
    return {
      baseURL: "http://127.0.0.1:8900/"
    };
  }
});
