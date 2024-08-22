<script setup>
import { ref, computed } from "vue";
import { getCategoryApi } from "@/api/index.js";
import { httpCodeEnum } from "@/utils/enums.js";
import { useRouter } from "vue-router";
import { showToast } from "vant";

const router = useRouter();
const list = ref([]);
const currentIndex = ref(0);

const currentName = computed(() => {
  return list.value.length > currentIndex.value && list.value[currentIndex.value]
    ? list.value[currentIndex.value].name
    : "";
});
const currentItems = computed(() => {
  return list.value.length > currentIndex.value && list.value[currentIndex.value]
    ? list.value[currentIndex.value].items
    : [];
});

getCategory();

async function getCategory() {
  const { status, data } = await getCategoryApi();
  if (status === httpCodeEnum.OK) {
    list.value = data;
  }
}

function jumpSearch() {
  router.push("/search");
}
function jumpDetail(title) {
  showToast(`正在跳转到${title}`);
}
</script>

<template>
  <div class="category">
    <van-sticky style="border-bottom: 1px solid #ededed">
      <van-search placeholder="请输入搜索关键词" shape="round" @click="jumpSearch" />
    </van-sticky>

    <div class="category-content">
      <van-sidebar v-model="currentIndex" class="category-content-left">
        <van-sidebar-item v-for="item in list" :key="item.name" :title="item.name" />
      </van-sidebar>

      <div class="category-content-right">
        <h5 class="title">{{ currentName }}</h5>
        <van-grid :column-num="3" :border="false" icon-size="70px">
          <van-grid-item
            v-for="item in currentItems"
            :key="item.title"
            :icon="item.icon"
            :text="item.title"
            @click="jumpDetail(item.title)"
          />
        </van-grid>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.van-sidebar-item {
  text-align: center;
}

::-webkit-scrollbar {
  display: none;
}

.category {
  height: 100vh;
  overflow: hidden;

  &-content {
    display: flex;

    &-left {
      padding-bottom: 50px;
      height: calc(100vh - 54px);
      overflow: scroll;
      box-sizing: border-box;
    }

    &-right {
      flex: 1;

      .title {
        color: #151516;
        margin: 30px 30px 10px;
        font-size: 17px;
        font-weight: lighter;
      }
    }
  }
}
</style>
