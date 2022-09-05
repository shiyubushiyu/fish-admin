import { mockRequest } from '../request'

/* 登录 */
export function mockLogin() {
  return mockRequest.post<boolean>('/login', {
    userName: 'admin',
    password: '123456'
  })
}
