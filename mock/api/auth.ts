import type { MockMethod } from 'vite-plugin-mock'

/** 参数错误的状态码 */
const ERROR_PARAM_CODE = 10000

const ERROR_PARAM_MSG = '参数校验失败！'

const apis: MockMethod[] = [
  // 用户+密码 登录
  {
    url: '/mock/login',
    method: 'post',
    response: (options: Service.MockOption): Service.MockServiceResult<any | null> => {
      const { userName = undefined, password = undefined } = options.body

      if (!userName || !password) {
        return {
          code: ERROR_PARAM_CODE,
          message: ERROR_PARAM_MSG,
          data: null
        }
      }
      return {
        code: 200,
        message: 'ok',
        data: {
          token: 'adfasdfsdhre123123123',
          name: '张三封',
          age: 18,
          mobile: 13833338888
        }
      }
    }
  }
]

export default apis
