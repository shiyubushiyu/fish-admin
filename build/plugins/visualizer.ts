import { visualizer } from 'rollup-plugin-visualizer'

/* 打包文件大小结果分析 */
export default visualizer({
  gzipSize: true,
  brotliSize: true,
  open: true
})
