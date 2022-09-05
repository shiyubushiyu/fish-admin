import { createApp } from 'vue'
import { setupAssets } from './plugins'
import App from './App.vue'
import { router } from './router'

function setupApp() {
  // import assets: js、css
  setupAssets()

  const app = createApp(App)

  // 挂载路由
  app.use(router)

  app.mount('#app')
}

setupApp()
