<template>
    <div class="shop-item flex-row a-c">
        <div class="shop-left flex-row a-c">
            <img :src="store.baseURL + props.shopInfo.image_path" alt="">
        </div>
        <div class="shop-center flex-1 flex-column j-c">

            <div class="shop-title flex-row a-c">
                <span>品牌</span>
                <h3>{{ props.shopInfo.name }}</h3>
            </div>
            <div class="shop-rate flex-row a-c">
                <van-rate v-model="value" readonly allow-half size="14px" color="orange" />
                <div class="rate-score">{{ value }}</div>
                <div class="sale-count">
                    月销：{{ props.shopInfo.recent_order_num }}单
                </div>
            </div>
            <div class="shop-costs">
                <span>￥{{ props.shopInfo.float_minimum_order_amount }}元起送 ／ 配送费约{{ props.shopInfo.float_delivery_fee
                    }}元</span>
            </div>
        </div>
        <div class="shop-right flex-column j-c">
            <div class="shop-support">
                <span v-for="(item, index) in props.shopInfo.supports" :key="index">{{ item.icon_name }}</span>

            </div>
            <div class="shop-server ">
                <span>{{ props.shopInfo.delivery_mode.text }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { serverAddress } from '@/stores/server';
const store = serverAddress();
const value = ref(3.5);
const props = defineProps({
    shopInfo: {
        type: Object
    }
});
value.value = props.shopInfo.rating;
</script>

<style lang="scss" scoped>
.shop-item {
    height: 0.9rem;
    padding: .1rem .15rem;
    border-bottom: 1px solid #ccc;

    .shop-left {
        width: .8rem;
        height: 80%;

        img {
            width: 80%;
            height: 80%;
            border: 1px solid #000;
        }


    }

    .shop-center {
        .shop-title {
            span {
                background: yellow;
                font-weight: bold;
                font-size: .14rem;
                padding: 0.05rem;
                font-size: .14rem;
            }

            h3 {
                font-size: .15rem;
                margin-left: .05rem;
            }
        }

        .shop-rate {
            padding: .03rem 0 .12rem 0;

            .sale-count {
                font-size: .12rem;
                color: #666;
                padding-left: .05rem;

            }
        }

        .rate-score {
            color: #f00;
            font-size: .14rem;
        }

        .shop-costs {
            font-size: .12rem;
            color: #666;
        }


    }

    .shop-right {
        width: .8rem;
        font-size: .12rem;
        align-items: end;

        .shop-support {
            span {
                border: 1px solid #666;
                color: #666;
                padding: .01rem;
            }
        }

        .shop-server {
            margin: 0.03rem 0 0 .03rem;

            span {
                border: 1px solid #00A16A;
                color: #00A16A;
                padding: 0.01rem;
            }
        }
    }
}
</style>