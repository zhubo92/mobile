<script setup>
import { ref, reactive, onMounted, computed, onUnmounted } from "vue";
import { showToast } from "vant";
import { useRouter } from "vue-router";
import { getCaptchaApi, getCodeApi, loginApi } from "@/api/index.js";
import { httpCodeEnum } from "@/utils/enums.js";
import { useUserStore } from "@/stores/index.js";

const tabList = [
  { name: "code", title: "验证码登录" },
  { name: "password", title: "密码登录" }
];
const router = useRouter();
const userStore = useUserStore();
const activeName = ref("code");
const isClose = ref(false);
const captchaUrl = ref("");
const codeNum = ref(0);
const codeTimer = ref(null);
const form = reactive({
  phone: "15614410020",
  code: "",
  account: "zhubo",
  password: "123456",
  captcha: ""
});

const codeText = computed(() => {
  return codeNum.value > 0 ? `已发送${codeNum.value}秒` : "获取验证码";
});

const disabled = computed(() => {
  return codeNum.value > 0;
});

onMounted(async () => {
  const state = await userStore.getIsLogin();
  if (state) {
    await router.replace("/");
  } else {
    await getCaptcha();
  }
});
onUnmounted(() => {
  clearTimer();
});

async function handleLogin(params) {
  const { data, status, msg } = await loginApi(params);
  if (status === httpCodeEnum.OK) {
    showToast(msg);

    const { token, userInfo } = data;
    localStorage.setItem("token", token);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    sessionStorage.removeItem("Captcha-Key");

    await router.replace("/");
  } else {
    form.captcha = "";
    await getCaptcha();
  }
}

async function getCaptcha() {
  const {
    data: { base64Img, captchaKey },
    status
  } = await getCaptchaApi();
  if (status === httpCodeEnum.OK) {
    captchaUrl.value = base64Img;
    sessionStorage.setItem("Captcha-Key", captchaKey);
  }
}

function clearTimer() {
  if (codeTimer.value) {
    clearInterval(codeTimer.value);
    codeTimer.value = null;
  }
}

function startTimer() {
  codeNum.value = 60;
  codeTimer.value = setInterval(() => {
    codeNum.value--;
    if (codeNum.value === 0) {
      clearTimer();
    }
  }, 1000);
}

async function getCode() {
  const { status } = await getCodeApi(form.phone);
  if (status === httpCodeEnum.OK) {
    startTimer();
  }
}

function verifyForm(values) {
  if ("phone" in values && !values["phone"]) {
    showToast("手机号不能为空");
    return false;
  }

  if ("code" in values && !values["code"]) {
    showToast("验证码不能为空");
    return false;
  }

  if ("account" in values && !values["account"]) {
    showToast("账号不能为空");
    return false;
  }

  if ("password" in values && !values["password"]) {
    showToast("密码不能为空");
    return false;
  }

  if ("captcha" in values && !values["captcha"]) {
    showToast("图形验证码不能为空");
    return false;
  }

  return true;
}

async function onSubmit(values) {
  console.log(values);
  if (!verifyForm(values)) return;
  await handleLogin(values);
}

function handleBack() {
  router.back();
}
</script>

<template>
  <div class="login">
    <van-icon name="share" class="login-back" @click="handleBack" />
    <h1 class="login-title">
      买桃网
      <span>maitao.shop</span>
    </h1>
    <van-tabs v-model:active="activeName" class="login-tab">
      <van-tab v-for="tab in tabList" :key="tab.name" :title="tab.title" :name="tab.name"></van-tab>
    </van-tabs>
    <van-form @submit="onSubmit">
      <van-cell-group>
        <template v-if="activeName === 'code'">
          <van-field v-model="form.phone" name="phone" left-icon="phone-o" placeholder="手机号" />
          <van-field v-model="form.code" left-icon="other-pay" name="code" placeholder="短信验证码">
            <template #button>
              <van-button type="primary" :disabled="disabled" @click="getCode">
                {{ codeText }}
              </van-button>
            </template>
          </van-field>
        </template>
        <template v-else>
          <van-field
            v-model="form.account"
            left-icon="manager-o"
            name="account"
            placeholder="账号"
          />
          <van-field
            v-model="form.password"
            :type="isClose ? 'text' : 'password'"
            name="password"
            left-icon="shield-o"
            :right-icon="isClose ? 'eye-o' : 'closed-eye'"
            placeholder="密码"
            @click-right-icon="() => (isClose = !isClose)"
          />
          <van-field
            v-model="form.captcha"
            left-icon="other-pay"
            name="captcha"
            placeholder="图形验证码"
          >
            <template #button>
              <van-image :src="captchaUrl" fit="contain" @click="getCaptcha" />
            </template>
          </van-field>
        </template>
      </van-cell-group>
      <div style="margin: 20px 30px">
        <van-button round block type="primary" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped lang="less">
::v-deep(.van-tab) {
  flex: none;
  font-size: 18px;
}

::v-deep(.van-tabs__nav) {
  justify-content: space-evenly;
  background-color: #f5f5f5;
}

::v-deep(.van-field__left-icon) {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

::v-deep(.van-field__body) {
  height: 40px;
}

.login {
  padding-top: 12vh;
  height: 100vh;
  background-color: #f5f5f5;

  &-back {
    position: fixed;
    top: 0;
    left: 0;
    padding: 20px;
    font-size: 30px;
    color: @themeColor;
    transform: rotateY(180deg);
  }

  &-title {
    position: relative;
    margin: 0 auto 50px;
    width: fit-content;
    font-size: 50px;
    color: @themeColor;
    font-family: "STHupo";

    span {
      position: absolute;
      bottom: -20px;
      right: -30px;
      font-size: 14px;
    }
  }

  &-tab {
    margin-bottom: 20px;
    width: 100%;
  }
}
</style>
