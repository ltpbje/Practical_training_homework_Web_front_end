<template>
    <div class="shop-item flex-row a-c">
        <div class="shop-left flex-row a-c">
            <img src="" alt="">
        </div>
        <div class="shop-center flex-1 flex-column j-c">

            <div class="shop-title flex-row a-c">
                <span>品牌</span>
                <h3>每时每刻</h3>
            </div>
            <div class="shop-rate flex-row a-c">
                <van-rate v-model="value" readonly allow-half size="14px" color="orange" />
                <div class="rate-score">{{ value }}</div>
                <div class="sale-count">
                    月销：100单
                </div>
            </div>
            <div class="shop-costs">
                <span>￥18元起送 ／ 配送费约5元</span>
            </div>
        </div>
        <div class="shop-right flex-column j-c">
            <div class="shop-support">
                <span>包</span>
                <span>包</span>
                <span>包</span>
            </div>
            <div class="shop-server ">
                <span>叮当配送</span>
            </div>
        </div>
    </div>
</template>

<script setup>
const value = 3.5;
</script>

<style lang="scss" scoped>
.shop-item {
    height: 0.8rem;
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