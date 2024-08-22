import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { getIsLoginApi } from "@/api/index.js";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("counter", () => {
  const router = useRouter();
  const isAuthenticated = ref(false);
  const userInfo = reactive({});

  async function getIsLogin() {
    const { data } = await getIsLoginApi();
    isAuthenticated.value = data;
    return data;
  }

  function logout() {
    sessionStorage.clear();
    localStorage.clear();
    router.push("/login");
  }

  return { isAuthenticated, userInfo, getIsLogin, logout };
});
