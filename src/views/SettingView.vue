<script setup>
import { useUserStore } from "@/stores/index.js";
import { showConfirmDialog } from "vant";

const list = [
  { title: "通用", icon: "list-switch" },
  { title: "安全中心", icon: "shield-o" },
  { title: "意见反馈", icon: "records-o" },
  { title: "常见反馈", icon: "chat-o" }
];

const { logout } = useUserStore();

function handleLogout() {
  showConfirmDialog({
    title: "提示",
    message: "确定要退出登录吗？"
  })
    .then(() => {
      // on confirm
      logout();
    })
    .catch(() => {
      // on cancel
    });
}
</script>

<template>
  <div class="setting">
    <NavBar />
    <van-cell-group inset class="setting-content">
      <van-cell
        v-for="item in list"
        :key="item.title"
        :title="item.title"
        is-link
        :icon="item.icon"
      />
    </van-cell-group>
    <van-cell-group inset class="setting-content">
      <van-cell title="退出登录" class="setting-content-logout" @click="handleLogout" />
    </van-cell-group>
  </div>
</template>

<style scoped lang="less">
.setting {
  height: 100vh;
  background-color: #f7f8fa;

  &-content {
    margin-top: 20px;

    &-logout {
      color: @themeColor;
      text-align: center;
    }
  }
}
</style>
