import type { LoginPayload } from '../types/mes'
import { mockLogin } from './mock'

export function login(payload: LoginPayload) {
  return mockLogin(payload)
}
