import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles/index.scss";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElIcons from "@element-plus/icons-vue";
import "@/styles/theme/index.scss";
// 国际化
import { createI18n } from "vue-i18n";
import language from "../src/utils/language";
import "./actions";
// import config from '@/defaultSettings'

const international = createI18n({
  locale: "zh-CN", //默认显示的语言
  messages: language,
});
// import VueStorage from 'vue-ls';
// const WebStorage = VueStorage.useStorage({
//     namespace: 'pro__', 
//     name: 'ls',
//     storage: 'local',
// })
// 注册微应用
// const app = registerMicroApps(apps)
const app = createApp(App);
for (const name in ElIcons) {
  app.component(name, (ElIcons as any)[name]);
}
// app.config.globalProperties.WebStorage = WebStorage;

app.use(store).use(router).use(international).use(ElementPlus).mount("#app");
