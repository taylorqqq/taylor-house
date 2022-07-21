<template>
  <div class="login-container">
    <div class="title-section">
      <p class="title"></p>
      <!-- <p class="title">Vue3 TypeScript Vite Admin</p> -->
      <p class="desc">
        <!-- 本项目集成了Vue3、qiankun（微前端）、国际化、动态路由等技术，完全开源免费帮您快速搭建Saas管理后台！ -->
      </p>
      <img
        class="login-bg"
        src="https://xkxk-1253929253.cos.ap-shanghai.myqcloud.com/vue3-ts-vite-admin/login_bg.png"
        alt=""
      />
    </div>
    <div class="login-section">
      <el-tabs
        v-model="currentTab"
        class="demo-tabs"
        @tab-click="tabChangeHandler"
      >
        <el-tab-pane :label="$t('账号注册')" name="register">
          <el-form ref="ruleFormRef1" :model="form1" :rules="rule1">
            <div class="account-section">
              <div class="input-section">
                <el-form-item prop="username">
                  <el-input
                    v-model="form1.username"
                    class="w-50 m-2"
                    :placeholder="$t('请输入账号')"
                  >
                    <template #prefix>
                      <el-icon>
                        <user />
                      </el-icon>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item prop="userpwd">
                  <el-input
                    type="password"
                    style="margin-top: 20px"
                    v-model="form1.userpwd"
                    class="w-50 m-2"
                    :placeholder="$t('请输入密码')"
                  >
                    <template #prefix>
                      <el-icon>
                        <connection />
                      </el-icon>
                    </template>
                  </el-input>
                </el-form-item>
              </div>
              <div
                @click="loginHandler('register', ruleFormRef1)"
                class="login-btn"
              >
                {{ $t("注册") }}
              </div>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :label="$t('账号登录')" name="login">
          <el-form ref="ruleFormRef2" :model="form2" :rules="rule2">
            <div class="account-section">
              <div class="input-section">
                <el-form-item prop="username">
                  <el-input
                    v-model="form2.username"
                    class="w-50 m-2"
                    :placeholder="$t('请输入账号')"
                  >
                    <template #prefix>
                      <el-icon>
                        <user />
                      </el-icon>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item prop="userpwd">
                  <el-input
                    type="password"
                    style="margin-top: 20px"
                    v-model="form2.userpwd"
                    class="w-50 m-2"
                    :placeholder="$t('请输入密码')"
                  >
                    <template #prefix>
                      <el-icon>
                        <connection />
                      </el-icon>
                    </template>
                  </el-input>
                </el-form-item>
              </div>
              <div
                @click="loginHandler('login', ruleFormRef2)"
                class="login-btn"
              >
                {{ $t("登录") }}
              </div>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div class="footer-section">
        <!-- <span class="version"> {{ $t("版本号") }}:1.0.22071805</span> -->
      </div>
    </div>
    <div class="record-section">
      <!-- <span class="record">鄂ICP备2022008464号</span> -->
      <span class="record"></span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  Ref,
  reactive,
  onMounted,
  getCurrentInstance,
} from "vue";
// import Vue from "vue";
import type { TabsPaneContext } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import type { FormInstance } from "element-plus";
import emitter from "@/utils/bus";
import { ElNotification } from "element-plus";
import { userRegister, userLogin, userList } from "@/api/user/api";
import { addMenu, getmenuList } from "@/api/menu/api";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    // const { ctx } = getCurrentInstance(); //获取上下文实例，ctx=vue2的this
    const { proxy } = getCurrentInstance() as any; // 使用proxy代替ctx,因为ctx只在开发环境有效
    console.log(proxy);
    const store = useStore();
    // const WebStorage = proxy.WebStorage;
    const ruleFormRef1 = ref<FormInstance>();
    const ruleFormRef2 = ref<FormInstance>();
    const accountRule = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("账号不能为空，可以随意填"));
      } else {
        callback();
      }
    };
    const passwordRule = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("密码不能为空，可以随意填"));
      } else {
        callback();
      }
    };
    const form1 = reactive({
      username: "",
      userpwd: "",
      usertype: 3,
    });
    const rule1 = reactive({
      username: [{ validator: accountRule, trigger: "blur", require: true }],
      userpwd: [{ validator: passwordRule, trigger: "blur", require: true }],
    });
    const form2 = reactive({
      username: "manager",
      userpwd: "123456",
    });
    const rule2 = reactive({
      username: [{ validator: accountRule, trigger: "blur", require: true }],
      userpwd: [{ validator: passwordRule, trigger: "blur", require: true }],
    });

    const currentTab: Ref<string> = ref("register");
    const tabChangeHandler = (_tab: TabsPaneContext, _event: Event) => {};

    const router = useRouter();
    const route = useRoute();

    const loginHandler = (type: string, form: FormInstance | undefined) => {
      if (!form) return;
      form.validate((valid) => {
        if (valid) {
          if (type == "register") {
            userRegister(form1).then((res: any) => {
              if (res.code == 200) {
                ElNotification.success({
                  title: "提示",
                  message: "注册成功",
                });
                currentTab.value = "login";
              } else {
                ElNotification.error({
                  title: "提示",
                  message: res.msg,
                });
              }
            });
          } else {
            userLogin(form2).then((res: any) => {
              if (res.code == 200) {
                const loginInfo = res;
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("permission", type);
                localStorage.setItem("info", JSON.stringify(res.data.info));
                getmenuList({}).then((res: any) => {
                  if (res.code == 200) {
                    store.commit('SET_PERMISSION', res.data);
                    emitter.emit("loginStatus", loginInfo);
                    router.push("/home");
                  } else {
                    ElNotification.error({
                      title: "提示",
                      message: res.msg,
                    });
                  }
                });
                // addMenu({
                //   component: "/exhibition",
                //   deleteFlag: "0",
                //   enabled: true,
                //   icon: "sliders",
                //   name: "数据大屏",
                //   number: "00098",
                //   parentNumber: "0",
                //   pushBtn: "",
                //   sort: "001",
                //   state: null,
                //   type: null,
                //   url: "/exhibition",
                // }).then((res: any) => {
                //   if (res.code == 200) {
                //     emitter.emit("loginStatus", loginInfo);
                //     router.push("/home");
                //     ElNotification.success({
                //       title: "提示",
                //       message: res.msg,
                //     });
                //   } else {
                //     ElNotification.error({
                //       title: "提示",
                //       message: res.msg,
                //     });
                //   }
                // });
                // emitter.emit("userList", res.data);
                // component,
                // deleteFlag,
                // enabled,
                // icon,
                // name,
                // number,
                // parentNumber,
                // pushBtn,
                // sort,
                // state,
                // type,
              } else {
                ElNotification.error({
                  title: "登录失败",
                  message: res.msg,
                });
              }
            });
          }
        }
      });
    };

    /**
     * 这里设置cookie
     */
    const setCookie = (
      key: string,
      value: string,
      { time = 1, path = "/" }
    ) => {
      let date = new Date();
      date.setTime(date.getTime() + time * 60 * 60 * 1000);
      let cookieStr =
        key +
        "=" +
        value +
        ";" +
        "path=" +
        path +
        ";" +
        "expires=" +
        date.toUTCString();
      document.cookie = cookieStr;
    };

    const account = ref("");
    const password = ref("");

    onMounted(() => {
      let type = route.params.type as any;
      if (type) {
        currentTab.value = type;
      }
    });

    return {
      currentTab,
      tabChangeHandler,
      loginHandler,
      account,
      password,
      form1,
      form2,
      rule1,
      rule2,
      ruleFormRef1,
      ruleFormRef2,
    };
  },
});
</script>

<style lang="scss">
.login-container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-image: linear-gradient(
      calc(160deg),
      rgba(163, 163, 163, 0.09) 0%,
      rgba(163, 163, 163, 0.09) 33.3%,
      rgba(100, 100, 100, 0.09) 33.3%,
      rgba(100, 100, 100, 0.09) 66.6%,
      rgba(162, 162, 162, 0.09) 66.6%,
      rgba(162, 162, 162, 0.09) 99%
    ),
    linear-gradient(
      calc(366deg),
      rgba(193, 193, 193, 0.06) 0%,
      rgba(193, 193, 193, 0.06) 33.3%,
      rgba(169, 169, 169, 0.06) 33.3%,
      rgba(169, 169, 169, 0.06) 66.6%,
      rgba(92, 92, 92, 0.06) 66.6%,
      rgba(92, 92, 92, 0.06) 99%
    ),
    linear-gradient(
      calc(237deg),
      rgba(45, 45, 45, 0.03) 0%,
      rgba(45, 45, 45, 0.03) 33.3%,
      rgba(223, 223, 223, 0.03) 33.3%,
      rgba(223, 223, 223, 0.03) 66.6%,
      rgba(173, 173, 173, 0.03) 66.6%,
      rgba(173, 173, 173, 0.03) 99%
    ),
    linear-gradient(
      calc(388deg),
      rgba(226, 226, 226, 0.06) 0%,
      rgba(226, 226, 226, 0.06) 33.3%,
      rgba(81, 81, 81, 0.06) 33.3%,
      rgba(81, 81, 81, 0.06) 66.6%,
      rgba(186, 186, 186, 0.06) 66.6%,
      rgba(186, 186, 186, 0.06) 99%
    ),
    linear-gradient(
      calc(193deg),
      rgba(225, 225, 225, 0.04) 0%,
      rgba(225, 225, 225, 0.04) 33.3%,
      rgba(95, 95, 95, 0.04) 33.3%,
      rgba(95, 95, 95, 0.04) 66.6%,
      rgba(39, 39, 39, 0.04) 66.6%,
      rgba(39, 39, 39, 0.04) 99%
    ),
    linear-gradient(
      calc(236deg),
      rgba(184, 184, 184, 0.06) 0%,
      rgba(184, 184, 184, 0.06) 33.3%,
      rgba(0, 0, 0, 0.06) 33.3%,
      rgba(0, 0, 0, 0.06) 66.6%,
      rgba(140, 140, 140, 0.06) 66.6%,
      rgba(140, 140, 140, 0.06) 99.9%
    ),
    linear-gradient(
      calc(431deg),
      rgba(40, 40, 40, 0.07) 0%,
      rgba(40, 40, 40, 0.07) 33.3%,
      rgba(214, 214, 214, 0.07) 33.3%,
      rgba(214, 214, 214, 0.07) 66.6%,
      rgba(190, 190, 190, 0.07) 66.6%,
      rgba(190, 190, 190, 0.07) 99.9%
    ),
    linear-gradient(
      calc(169deg),
      rgba(230, 230, 230, 0) 0%,
      rgba(230, 230, 230, 0) 33.3%,
      rgba(241, 241, 241, 0) 33.3%,
      rgba(241, 241, 241, 0) 66.6%,
      rgba(55, 55, 55, 0) 66.6%,
      rgba(55, 55, 55, 0) 99%
    ),
    linear-gradient(calc(108deg), rgb(38, 38, 227), rgb(11, 186, 239));

  .record-section {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0;

    .record {
      color: #e1ebec;
      bottom: 0;
      left: 0;
      right: 0;
      font-size: 14px;
    }
  }

  .title-section {
    margin-top: 100px;
    padding-left: 200px;

    .title {
      height: 60px;
      line-height: 60px;
      color: #fff;
      font-size: 40px;
      font-weight: 550;
      text-shadow: 0px 0px 0 #fff, -1px -1px 0 #fff, -1px -1px 0 #fff,
        -2px -2px 0 #fff, -2px -2px 0 #fff, -4px -2px 2px #a4a4a4,
        -4px -2px 2px #a4a4a4;
    }

    .desc {
      color: #e1ebec;
      font-size: 16px;
      line-height: 30px;
      width: 600px;
    }

    .login-bg {
      width: 600px;
      height: 450px;
      border-radius: 10px;
    }
  }

  .footer-section {
    text-align: center;
    padding-top: 10px;

    .version {
      font-size: 13px;
      color: #a4a4a4;
    }
  }

  .login-section {
    width: 500px;
    padding-bottom: 20px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    right: 250px;
    top: 250px;

    .login-btn {
      width: 320px;
      height: 40px;
      line-height: 40px;
      color: #fff;
      text-align: center;
      border-radius: 5px;
      background-color: #409eff;
      margin: 0 auto;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
    }

    .input-section {
      padding: 20px 90px;
    }

    .el-tabs__nav {
      width: 100%;
      display: flex;
      justify-content: space-around;
      margin-top: 20px;

      .el-tab-pane {
        width: 100%;

        .account-section {
          width: 100%;
        }
      }

      .el-tabs__item {
        width: 25%;
        text-align: center;
        border: none;
      }
    }
  }
}
</style>
