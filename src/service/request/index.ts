import { getEnvConfig } from '~/.env-config'
import { createRequest, createHookRequest } from './request'

// 当前环境配置
const envConfig = getEnvConfig(import.meta.env)

// 是否开启正向代理
const isHttpProxy = import.meta.env.VITE_HTTP_PROXY

// 创建hookAxios请求实例
export const request = createHookRequest({
  baseURL: isHttpProxy ? envConfig.proxy : envConfig.url
})

// 创建mock请求实例
export const mockRequest = createRequest({ baseURL: '/mock' })
