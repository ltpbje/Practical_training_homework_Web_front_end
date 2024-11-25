import { useRoute } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
const route = useRoute();
const list = ref([]);
const getBreadCrumb = (matched) => {
    if (matched.length && matched[1].name == "index") {
        list.value = matched.slice(0, 1);
    } else {
        list.value = matched.slice(1, matched.length);
    }
};
watch(route, (newVal) => {
    getBreadCrumb(newVal.matched);
});
onMounted(() => {
    list.value = route.matched;
});