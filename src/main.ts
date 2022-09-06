import { createApp } from 'vue'
import { setupAssets } from './plugins'
import { router } from './router'
import { setupPinia } from './store'
import App from './App.vue'

function setupApp() {
  // import assets: js、css
  setupAssets()

  const app = createApp(App)

  // 挂载pinia
  setupPinia(app)

  // 挂载路由
  app.use(router)

  app.mount('#app')
}

setupApp()
