import type { PluginOption } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

/* 主要是为了对 index.html 进行压缩和注入动态数据，例如替换网站标题和cdn */
export default (viteEnv: ImportMetaEnv): PluginOption[] => {
  return createHtmlPlugin({
    minify: true,
    inject: {
      data: {
        appName: viteEnv.VITE_APP_NAME,
        appTitle: viteEnv.VITE_APP_TITLE
      }
    }
  })
}
