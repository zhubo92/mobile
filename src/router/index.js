import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("@/views/HomeView.vue"),
      meta: {
        title: "首页",
        tabBar: true
      }
    },
    {
      path: "/category",
      name: "Category",
      component: () => import("@/views/CategoryView.vue"),
      meta: {
        title: "分类",
        tabBar: true
      }
    },
    {
      path: "/search",
      name: "Search",
      component: () => import("@/views/SearchView.vue"),
      meta: {
        title: "搜索",
        tabBar: true
      }
    },
    {
      path: "/cart",
      name: "Cart",
      component: () => import("@/views/CartView.vue"),
      meta: {
        title: "购物车",
        tabBar: true
      }
    },
    {
      path: "/me",
      name: "Me",
      component: () => import("@/views/MeView.vue"),
      meta: {
        title: "个人中心",
        tabBar: true
      }
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/LoginView.vue"),
      meta: {
        title: "登录"
      }
    },
    {
      path: "/setting",
      name: "Setting",
      component: () => import("@/views/SettingView.vue"),
      meta: {
        title: "设置"
      }
    }
  ]
});

router.beforeEach((to) => {
  document.title = to.meta.title;
  const token = localStorage.getItem("token");
  if (
    // 检查用户是否已登录
    !token &&
    // ❗️ 避免无限重定向
    to.name !== "Login"
  ) {
    // 将用户重定向到登录页面
    return { name: "Login" };
  }
});

export default router;
