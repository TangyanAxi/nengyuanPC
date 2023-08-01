import { createSSRApp } from 'vue';
import App from './App.vue';
import { setupStore } from '@/state';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import '@/assets/style/main.scss';
import tmui from './tmui';
import 'uno.css';

export function createApp() {
  const app = createSSRApp(App);
  app.use(ElementPlus);
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }

  // Configure store
  setupStore(app);

  app.use(tmui, {} as Tmui.tmuiConfig);

  return {
    app,
  };
}
