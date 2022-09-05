import { viteMockServe } from 'vite-plugin-mock'

// mock数据
export default viteMockServe({
  mockPath: 'mock',
  injectCode: `
		import { setupMockServer } from '../mock';
		setupMockServer();
	`
})
