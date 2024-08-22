<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, watch, onMounted } from "vue";

const tabList = [
  { name: "/home", title: "首页", icon: "wap-home-o" },
  { name: "/category", title: "分类", icon: "apps-o" },
  { name: "/search", title: "搜索", icon: "search" },
  { name: "/cart", title: "购物车", icon: "shopping-cart-o" },
  { name: "/me", title: "个人中心", icon: "friends-o" }
];

const router = useRouter();
const route = useRoute();

const active = ref("");

onMounted(() => {
  active.value = route.path;
});

watch(
  () => route.path,
  (val) => {
    console.log(val, "route.path");
    active.value = val === "/" ? "/home" : val;
  }
);

function onChange(val) {
  router.replace(val);
}
</script>

<template>
  <div class="tab-bar">
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item v-for="item in tabList" :key="item.name" :name="item.name" :icon="item.icon">
        {{ item.title }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped></style>
