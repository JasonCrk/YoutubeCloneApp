import { JwtToken } from '../types'

export interface AuthTokens {
  access: JwtToken
  refresh: JwtToken
}
