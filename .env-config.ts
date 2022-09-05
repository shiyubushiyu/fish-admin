/** 请求环境配置 */
type ServiceEnv = Record<EnvType, EnvConfig>

/** 环境配置 */
const serviceEnvConfig: ServiceEnv = {
  /* 开发 */
  dev: {
    url: '',
    proxy: '/api'
  },
  /* 测试 */
  test: {
    url: '',
    proxy: '/api'
  },
  /* 生产 */
  prod: {
    url: '',
    proxy: '/api'
  }
}

/**
 * 获取环境配置
 * @param env 环境描述
 */
export function getEnvConfig(env: ImportMetaEnv) {
  const { VITE_ENV_TYPE = 'dev' } = env

  const envConfig = serviceEnvConfig[VITE_ENV_TYPE]

  return envConfig
}
