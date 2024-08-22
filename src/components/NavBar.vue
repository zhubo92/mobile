<script setup>
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const { title } = route.meta;

function onClickLeft() {
  router.back();
}
</script>

<template>
  <div class="nav-bar">
    <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<style scoped lang="less"></style>
