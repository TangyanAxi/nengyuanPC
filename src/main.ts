import { createSSRApp } from 'vue';
import App from './App.vue';
import { setupStore } from '@/state';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/assets/style/main.scss';
import tmui from './tmui';
import 'uno.css';

export function createApp() {
  const app = createSSRApp(App);
  app.use(ElementPlus);

  // Configure store
  setupStore(app);

  app.use(tmui, {} as Tmui.tmuiConfig);

  return {
    app,
  };
}
