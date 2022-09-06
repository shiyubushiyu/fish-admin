import { mockRequest } from '../request'

/* 登录 */
export function fetchMockLogin({ userName, password }: { userName: string; password: string }) {
  return mockRequest.post<boolean>('/login', {
    userName,
    password
  })
}
