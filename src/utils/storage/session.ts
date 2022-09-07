import { encrypto, decrypto } from '../crypto'

/* 存数据 */
export function setSession(key: string, value: unknown) {
  const json = encrypto(value)
  sessionStorage.setItem(key, json)
}

/* 取数据 */
export function getSession<T>(key: string) {
  const json = sessionStorage.getItem(key)
  let data: T | null = null
  if (json) {
    try {
      data = decrypto(json)
    } catch {
      // 防止解析失败
    }
  }
  return data
}

/* 移除数据 */
export function removeSession(key: string) {
  window.sessionStorage.removeItem(key)
}

/* 移除所有数据 */
export function clearSession() {
  window.sessionStorage.clear()
}
