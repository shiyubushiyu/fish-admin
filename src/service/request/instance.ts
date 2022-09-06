import axios from 'axios'
import qs from 'qs'
import type { AxiosRequestConfig, AxiosInstance, AxiosError, AxiosResponse } from 'axios'

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
      successCode: 200
    }
  ) {
    this.backendConfig = backendConfig
    this.instance = axios.create(axiosConfig)
    this.setInterceptor()
  }

  /* 设置拦截器 */
  setInterceptor() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      async (config) => {
        const handleConfig = { ...config }
        if (handleConfig.headers) {
          // 数据转换
          const contentType = handleConfig.headers['Content-Type'] as string
          handleConfig.data = await transformRequestData(handleConfig.data, contentType)
          // 设置token
          // handleConfig.headers.Authorization = ''
        }
        return handleConfig
      },
      (axiosError: AxiosError) => {
        return axiosError
      }
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      async (response) => {
        const { status } = response
        // 处理后端响应错误信息
        if (status === 200 || status < 300 || status === 304) {
          const backend = response.data
          const { codeKey, dataKey, successCode } = this.backendConfig
          // 请求成功
          if (backend[codeKey] === successCode) {
            return handleServiceResult(null, backend[dataKey])
          }
          const error = handleBackendError(backend, this.backendConfig)
          return handleServiceResult(error, null)
        }
        const error = handleResponseError(response)
        return handleServiceResult(error, null)
      },
      (axiosError: AxiosError) => {
        const error = handleAxiosError(axiosError)
        return handleServiceResult(error, null)
      }
    )
  }
}

/** http请求头的content-type类型 */
export enum EnumContentType {
  json = 'application/json',
  formUrlencoded = 'application/x-www-form-urlencoded',
  formData = 'multipart/form-data'
}

/** 数据类型 */
export enum EnumDataType {
  number = '[object Number]',
  string = '[object String]',
  boolean = '[object Boolean]',
  null = '[object Null]',
  undefined = '[object Undefined]',
  object = '[object Object]',
  array = '[object Array]',
  date = '[object Date]',
  regexp = '[object RegExp]',
  set = '[object Set]',
  map = '[object Map]',
  file = '[object File]'
}

/**
 * 请求数据的转换
 * @param requestData - 请求数据
 * @param contentType - 请求头的Content-Type
 */
export async function transformRequestData(requestData: any, contentType?: string) {
  // application/json类型不处理
  let data = requestData
  // form类型转换
  if (contentType === EnumContentType.formUrlencoded) {
    data = qs.stringify(requestData)
  }
  // form-data类型转换
  if (contentType === EnumContentType.formData) {
    data = await handleFormData(requestData)
  }

  return data
}

async function handleFormData(data: Record<string, any>) {
  const formData = new FormData()
  const entries = Object.entries(data)

  entries.forEach(async ([key, value]) => {
    const isFileType =
      Object.prototype.toString.call(value) === EnumDataType.file ||
      (Object.prototype.toString.call(value) === EnumDataType.array &&
        value.length &&
        Object.prototype.toString.call(value[0]) === EnumDataType.file)

    if (isFileType) {
      await transformFile(formData, key, value)
    } else {
      formData.append(key, value)
    }
  })

  return formData
}

/**
 * 接口为上传文件的类型时数据转换
 * @param key - 文件的属性名
 * @param file - 单文件或多文件
 */
async function transformFile(formData: FormData, key: string, file: File[] | File) {
  if (Object.prototype.toString.call(file) === EnumDataType.array) {
    // 多文件
    await Promise.all(
      (file as File[]).map((item) => {
        formData.append(key, item)
        return true
      })
    )
  } else {
    // 单文件
    await formData.append(key, file as File)
  }
}

/** 统一失败和成功的请求结果的数据类型 */
export async function handleServiceResult<T = any>(error: Service.RequestError | null, data: any) {
  if (error) {
    const fail: Service.FailedResult = {
      error,
      data: null
    }
    return fail
  }
  const success: Service.SuccessResult<T> = {
    error: null,
    data
  }
  return success
}

/**
 * 处理后端返回的错误(业务错误)
 * @param backendResult - 后端接口的响应数据
 */
export function handleBackendError(
  backendResult: Record<string, any>,
  config: Service.BackendResultConfig
) {
  const { codeKey, msgKey } = config
  const error: Service.RequestError = {
    type: 'backend',
    code: backendResult[codeKey],
    msg: backendResult[msgKey]
  }

  showErrorMsg(error)

  return error
}

/** 默认的请求错误code */
export const DEFAULT_REQUEST_ERROR_CODE = 'DEFAULT'
/** 默认的请求错误文本 */
export const DEFAULT_REQUEST_ERROR_MSG = '请求错误~'
/** 网络不可用的code */
export const NETWORK_ERROR_CODE = 'NETWORK_ERROR'
/** 网络不可用的错误文本 */
export const NETWORK_ERROR_MSG = '网络不可用~'
/** 请求超时的错误code(为固定值：ECONNABORTED) */
export const REQUEST_TIMEOUT_CODE = 'ECONNABORTED'
/** 请求超时的错误文本 */
export const REQUEST_TIMEOUT_MSG = '请求超时~'
/** 请求不成功各种状态的错误 */
export const ERROR_STATUS = {
  400: '400: 请求出现语法错误~',
  401: '401: 用户未授权~',
  403: '403: 服务器拒绝访问~',
  404: '404: 请求的资源不存在~',
  405: '405: 请求方法未允许~',
  408: '408: 网络请求超时~',
  500: '500: 服务器内部错误~',
  501: '501: 服务器未实现请求功能~',
  502: '502: 错误网关~',
  503: '503: 服务不可用~',
  504: '504: 网关超时~',
  505: '505: http版本不支持该请求~',
  [DEFAULT_REQUEST_ERROR_CODE]: DEFAULT_REQUEST_ERROR_MSG
}
type ErrorStatus = keyof typeof ERROR_STATUS

/**
 * 处理请求成功后的错误
 * @param response - 请求的响应
 */
export function handleResponseError(response: AxiosResponse) {
  const error: Service.RequestError = {
    type: 'axios',
    code: DEFAULT_REQUEST_ERROR_CODE,
    msg: DEFAULT_REQUEST_ERROR_MSG
  }

  if (!window.navigator.onLine) {
    // 网路错误
    Object.assign(error, { code: NETWORK_ERROR_CODE, msg: NETWORK_ERROR_MSG })
  } else {
    // 请求成功的状态码非200的错误
    const errorCode: ErrorStatus = response.status as ErrorStatus
    const msg = ERROR_STATUS[errorCode] || DEFAULT_REQUEST_ERROR_MSG
    Object.assign(error, { type: 'backend', code: errorCode, msg })
  }

  showErrorMsg(error)

  return error
}

/**
 * 显示错误信息
 * @param error
 */
export function showErrorMsg(error: Service.RequestError) {
  if (!error.msg) return
  //
}

/** 通用类型 */
declare namespace Common {
  /**
   * 策略模式
   * [状态, 为true时执行的回调函数]
   */
  type StrategyAction = [boolean, () => void]
}

/**
 * 处理axios请求失败的错误
 * @param error - 错误
 */
export function handleAxiosError(axiosError: AxiosError) {
  const error: Service.RequestError = {
    type: 'axios',
    code: DEFAULT_REQUEST_ERROR_CODE,
    msg: DEFAULT_REQUEST_ERROR_MSG
  }

  const actions: Common.StrategyAction[] = [
    [
      // 网路错误
      !window.navigator.onLine || axiosError.message === 'Network Error',
      () => {
        Object.assign(error, { code: NETWORK_ERROR_CODE, msg: NETWORK_ERROR_MSG })
      }
    ],
    [
      // 超时错误
      axiosError.code === REQUEST_TIMEOUT_CODE && axiosError.message.includes('timeout'),
      () => {
        Object.assign(error, { code: REQUEST_TIMEOUT_CODE, msg: REQUEST_TIMEOUT_MSG })
      }
    ],
    [
      // 请求不成功的错误
      Boolean(axiosError.response),
      () => {
        const errorCode: ErrorStatus = (axiosError.response?.status as ErrorStatus) || 'DEFAULT'
        const msg = ERROR_STATUS[errorCode]
        Object.assign(error, { code: errorCode, msg })
      }
    ]
  ]

  exeStrategyActions(actions)

  showErrorMsg(error)

  return error
}

/** 执行策略模式 */
export function exeStrategyActions(actions: Common.StrategyAction[]) {
  actions.some((item) => {
    const [flag, action] = item
    if (flag) {
      action()
    }
    return flag
  })
}
