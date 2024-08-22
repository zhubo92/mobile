<script setup>
import { showConfirmDialog, showToast } from "vant";
import { ref, watch } from "vue";

const onSubmit = () => showToast("点击按钮");
const checked = ref(false);
const value = ref(2);
const isManage = ref(false);
const isSelectAll = ref(false);

watch(isSelectAll, () => {});

function handleBeforeChange(value) {
  console.log(value);
  if (value === 0) {
    return new Promise((resolve) => {
      showConfirmDialog({
        title: "删除",
        message: "确认删除此商品吗？"
      })
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    });
  } else {
    return Promise.resolve(true);
  }
}
</script>

<template>
  <div class="cart">
    <van-nav-bar
      title="购物车"
      left-text=""
      :right-text="isManage ? '退出管理' : '管理'"
      @click-right="() => (isManage = !isManage)"
    ></van-nav-bar>
    <van-card class="cart-card" price="2.00" desc="描述信息" title="商品标题">
      <template #thumb>
        <div class="thumb">
          <van-checkbox v-model="checked"></van-checkbox>
          <van-image
            fit="cover"
            src="	http://t00img.yangkeduo.com/goods/images/2018-07-28/9754db01919d2fc5c12e1da537c22450.jpeg"
          />
        </div>
      </template>
      <template #num>
        <van-stepper v-model="value" disable-input :min="0" :before-change="handleBeforeChange" />
      </template>
    </van-card>
    <van-submit-bar :price="3050" :button-text="isManage ? '删除' : '结算'" @submit="onSubmit">
      <van-checkbox v-model="isSelectAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<style scoped lang="less">
.van-submit-bar {
  bottom: 50px;
}

.van-card {
  padding: 16px 16px 16px 50px;
}

.cart {
  min-height: 100vh;
  background-color: #f7f8fa;

  &-card {
    margin: 20px auto 0;
    width: 90%;
    background-color: #fff;
    border-radius: 10px;
  }

  .thumb {
    display: flex;
    align-items: center;

    > .van-checkbox {
      position: absolute;
      z-index: 20;
      left: -35px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
