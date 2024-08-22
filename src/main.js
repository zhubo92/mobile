import { createApp } from "vue";
import { createPinia } from "pinia";
import { Lazyload } from "vant";
import App from "./App.vue";
import router from "./router";

// 重置初始样式
import "reset-css";

// 引入组件样式
import "vant/lib/index.css";

// 公共样式
import "@/styles/common.less";

// 定制的样式
import "@/styles/vant.less";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Lazyload);

app.mount("#app");
