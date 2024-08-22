<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const searchList = [
  { id: 1, title: "抽纸批发" },
  { id: 2, title: "浴巾可穿" },
  { id: 3, title: "石榴水果" },
  { id: 4, title: "富豪卷纸" },
  { id: 5, title: "冰箱收纳盒" },
  { id: 6, title: "毛巾衣服" },
  { id: 7, title: "小白鞋增高透气" },
  { id: 8, title: "连衣裙" }
];

const router = useRouter();
const search = ref("");
const searchRef = ref();
const showBack = ref(false);

onMounted(() => {
  searchRef.value.focus();
  showBack.value = history.length > 1;
});

function handleBack() {
  router.back();
}

function handleSearch() {
  console.log(search.value);
}

function changeSearch(title) {
  search.value = title;
  handleSearch();
}
</script>

<template>
  <div class="search">
    <div class="search-header">
      <van-icon v-if="showBack" name="arrow-left" @click="handleBack" />
      <van-search v-model="search" ref="searchRef" placeholder="请输入搜索关键词" shape="round" />
      <div class="search-header-button" @click="handleSearch">搜索</div>
    </div>
    <div class="search-hot">
      <img src="@/assets/hot.png" alt="" />
      <span>热门搜索</span>
    </div>
    <div class="search-list">
      <div
        v-for="item in searchList"
        :key="item.id"
        class="search-list-item"
        @click="changeSearch(item.title)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.search {
  &-header {
    display: flex;
    align-items: center;

    .van-icon-arrow-left {
      padding: 10px;
    }

    .van-search {
      padding-left: 0;
      padding-right: 0;
      flex: 1;
    }

    &-button {
      padding: 10px;
      color: #9c9c9c;
    }
  }

  &-hot {
    display: flex;
    align-items: center;
    margin-left: 10px;
    height: 50px;

    img {
      margin-right: 5px;
      width: 30px;
      object-fit: contain;
    }

    span {
      color: #9c9c9c;
    }
  }

  &-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 10px;

    &-item {
      height: 20px;
      background-color: #f4f4f4;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 5px 5px;
      padding: 5px 10px;
      border-radius: 20px;
      color: #58595b;
      font-size: 14px;
    }
  }
}
</style>
