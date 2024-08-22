<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { getNavApi, getProductApi, getSlidesApi } from "@/api/index.js";
import { httpCodeEnum } from "@/utils/enums.js";
import HomeLoading from "@/components/HomeLoading.vue";

const tabList = [
  { name: 1, title: "热门" },
  { name: 2, title: "服饰" },
  { name: 3, title: "鞋包" },
  { name: 4, title: "母婴" },
  { name: 5, title: "百货" },
  { name: 6, title: "食品" },
  { name: 7, title: "内衣" },
  { name: 8, title: "男装" },
  { name: 9, title: "电器" },
  { name: 10, title: "数码" }
];

const router = useRouter();
const activeName = ref("");
const slides = ref([]);
const navList = ref([]);
const isExpand = ref(false);
const list = ref([]);
const loading = ref(false);
const finished = ref(false);

const currentNavs = computed(() => {
  if (navList.value.length <= 8) return navList.value;
  return isExpand.value ? navList.value : navList.value.slice(0, 7);
});

getSlides();
getNav();

function jumpSearch() {
  router.push("/search");
}

async function getSlides() {
  const { status, data } = await getSlidesApi();
  if (status === httpCodeEnum.OK) {
    slides.value = data;
  }
}

async function getNav() {
  const { status, data } = await getNavApi();
  if (status === httpCodeEnum.OK) {
    navList.value = data;
  }
}

function jumpSlide(detail) {
  location.href = detail;
}

function handleToggle() {
  isExpand.value = !isExpand.value;
}

async function onLoad() {
  setTimeout(async () => {
    loading.value = true;
    const { status, data } = await getProductApi();
    loading.value = false;
    if (status === httpCodeEnum.OK) {
      list.value.push(...data);
      if (list.value.length > 90) finished.value = true;
    }
  }, 2000);
}
</script>

<template>
  <Suspense>
    <template #default>
      <div class="home">
        <van-search placeholder="请输入搜索关键词" shape="round" @click="jumpSearch" />
        <van-tabs v-model:active="activeName">
          <van-tab v-for="tab in tabList" :key="tab.name" :title="tab.title" :name="tab.name">
          </van-tab>
        </van-tabs>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="slide in slides" :key="slide.id">
            <img :src="slide.imgurl" alt="" class="slide-img" @click="jumpSlide(slide.detail)" />
          </van-swipe-item>
        </van-swipe>
        <van-grid>
          <van-grid-item
            v-for="navItem in currentNavs"
            :key="navItem.id"
            :icon="navItem.iconurl"
            :text="navItem.icontitle"
          />

          <template v-if="navList.length > 8">
            <van-grid-item v-if="isExpand" icon="arrow-up" text="收起" @click="handleToggle" />
            <van-grid-item v-else icon="apps-o" text="更多" @click="handleToggle" />
          </template>
        </van-grid>
        <img src="@/assets/banner.jpeg" alt="" class="home-banner" />
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell v-for="item in list" :key="item.goods_id">
            <div class="home-product">
              <img v-lazy="item.thumb_url" class="home-product-img" alt="" />
              <div class="home-product-info">
                <div class="title">{{ item.goods_name }}</div>
                <div class="label">
                  <div class="label-item">极速退换</div>
                  <div class="label-item">退换包运费</div>
                </div>
                <div class="bottom">
                  <div class="bottom-price">￥{{ item.normal_price / 100 }}</div>
                  <div class="bottom-tip">{{ item.sales_tip }}</div>
                  <div class="bottom-user">
                    <img v-lazy="item.bubble_user1" class="bottom-user-item" />
                    <img v-lazy="item.bubble_user2" class="bottom-user-item" />
                  </div>
                </div>
              </div>
            </div>
          </van-cell>
        </van-list>
        <van-back-top />
      </div>
    </template>

    <template #fallback>
      <HomeLoading />
    </template>
  </Suspense>
</template>

<style lang="less" scoped>
.home {
  padding-bottom: 50px;

  .slide-img {
    display: flex;
    width: 100%;
    object-fit: cover;
  }

  &-banner {
    width: 100%;
    object-fit: contain;
  }

  .van-cell {
    padding: 0;
  }

  &-product {
    display: flex;

    &-img {
      margin: 5px;
      width: 40%;
      object-fit: cover;
      aspect-ratio: 1;
    }

    &-info {
      flex: 1;

      .title {
        margin-left: 3%;
        width: 94%;
        height: 60px;
        line-height: 20px;
        font-size: 14px;
        color: #000;
        overflow: hidden;
        text-align: left;
      }

      .label {
        display: flex;
        font-size: 11px;
        color: @themeColor;
        padding-top: 50px;

        &-item {
          margin-right: 5px;
          padding: 0 5px;
          background-color: rgba(255, 87, 6, 0.08);
        }
      }

      .bottom {
        margin-bottom: 5px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        &-price {
          color: @themeColor;
          font-size: 18px;
          font-weight: 700;
        }

        &-tip {
          color: #aaa;
          font-size: 12px;
          flex: none;
        }

        &-user {
          display: flex;
          width: 50px;

          &-item {
            flex: none;
            margin-right: -8px;
            width: 22px;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>
