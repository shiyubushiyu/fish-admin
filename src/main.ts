import { createApp } from 'vue'
import { setupAssets } from './plugins'
import App from './App.vue'

function setupApp() {
  // import assets: js、css
  setupAssets()

  const app = createApp(App)

  app.mount('#app')
}

setupApp()
