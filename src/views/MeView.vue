<script setup>
import { useRouter } from "vue-router";

const orderList = [
  { name: "待付款", icon: "paid" },
  { name: "待发货", icon: "free-postage" },
  { name: "待收货", icon: "logistics" },
  { name: "待评价", icon: "other-pay" },
  { name: "退款/售后", icon: "after-sale" }
];

const toolsList = [
  { name: "红包卡券", icon: "coupon" },
  { name: "关注店铺", icon: "star" },
  { name: "我的钱包", icon: "card" },
  { name: "客服中心", icon: "friends" },
  { name: "收货地址", icon: "location" },
  { name: "设置", icon: "setting", path: "/setting" }
];

const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const router = useRouter();

function handleJump(path) {
  if (path) router.push(path);
}
</script>

<template>
  <div class="me">
    <div class="me-header">
      <van-image
        src="https://pinduoduoimg.yangkeduo.com/avatar/default/9.png?imageMogr2/sharpen/50/strip%7CimageView2/2/w/1300/q/80/format/webp"
        fit="cover"
        class="me-header-avatar"
      />
      <div class="me-header-phone">{{ userInfo.user_phone }}</div>
    </div>
    <div class="me-content">
      <div class="me-content-header">
        <div class="left">我的订单</div>
        <div class="right">查看全部订单<van-icon name="arrow" /></div>
      </div>
      <van-grid :border="false" :column-num="5">
        <van-grid-item
          v-for="item in orderList"
          :key="item.name"
          :icon="item.icon"
          :text="item.name"
        />
      </van-grid>
    </div>
    <div class="me-content tools">
      <div class="me-content-header">
        <div class="left">实用工具</div>
      </div>
      <van-grid :border="false">
        <van-grid-item
          v-for="item in toolsList"
          :key="item.name"
          :icon="item.icon"
          :text="item.name"
          @click="handleJump(item.path)"
        />
      </van-grid>
    </div>
  </div>
</template>

<style scoped lang="less">
.me {
  margin: 0 auto;
  width: 90vw;

  &-header {
    display: flex;
    align-items: center;
    padding: 20px 0;

    &-avatar {
      margin-right: 10px;
      width: 60px;
      border-radius: 50%;
      overflow: hidden;
    }

    &-phone {
      font-size: 19px;
    }
  }

  &-content {
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 10px;
    box-shadow:
      rgba(0, 0, 0, 0) 0 0 0 0,
      rgba(0, 0, 0, 0) 0 0 0 0,
      rgba(0, 0, 0, 0.03) 0 0.8px 2px 0,
      rgba(0, 0, 0, 0.047) 0 2.7px 6.7px 0,
      rgba(0, 0, 0, 0.08) 0 12px 30px 0;

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    }
  }

  .tools {
    ::v-deep(.van-icon:before) {
      color: @themeColor;
    }
  }
}
</style>
