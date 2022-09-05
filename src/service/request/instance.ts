import axios from 'axios'
import type { AxiosRequestConfig, AxiosInstance, AxiosError } from 'axios'

/**
 * 封装axios请求类
 * @author fish
 */
export default class CustomAxiosInstance {
  instance: AxiosInstance

  backendConfig: Service.BackendResultConfig

  /**
   *
   * @param axiosConfig - axios配置
   * @param backendConfig - 后端返回的数据配置
   */
  constructor(
    axiosConfig: AxiosRequestConfig,
    backendConfig: Service.BackendResultConfig = {
      codeKey: 'code',
      dataKey: 'data',
      msgKey: 'message',
      successCode: 0
    }
  ) {
    this.backendConfig = backendConfig
    this.instance = axios.create(axiosConfig)
  }

  /* 设置拦截器 */
  setInterceptor() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        const handleConfig = { ...config }
        return handleConfig
      },
      (axiosError: AxiosError) => {
        return axiosError
      }
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        return response
      },
      (axiosError: AxiosError) => {
        return axiosError
      }
    )
  }
}
