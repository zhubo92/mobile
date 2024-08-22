<script setup>
import { RouterView, useRoute } from "vue-router";
import { ref } from "vue";
import TabBar from "@/components/TabBar.vue";
import { useUserStore } from "@/stores/index.js";

const theme = ref("light");
const route = useRoute();
const userStore = useUserStore();

userStore.getIsLogin();
</script>

<template>
  <van-config-provider :theme="theme">
    <div class="container">
      <RouterView />
    </div>
    <TabBar v-if="route.meta.tabBar" />
  </van-config-provider>
</template>

<style scoped></style>
