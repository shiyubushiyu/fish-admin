import { request } from '../request'

/**
 * 获取用户信息
 */
export function fetchUserInfo(data: any) {
  return request.post<boolean>('/userInfo', data)
}
