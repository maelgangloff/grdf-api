export default interface AuthResponse {
  state: 'SUCCESS' | 'REINPUT'
  error?: 'LOGIN_INVALID_ATTEMPTS' | 'AUTH_FAIL'
  actualLockoutDuration: number
  redirectUrl?: string
  message?: string
  displayCaptcha: boolean
  surname: string
  name: string
  email: string
}
