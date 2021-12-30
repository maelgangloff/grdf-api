import { GRDF } from '../index'
import { UserInfo } from './User/UserInfo'
import { UserInfoDetails } from './User/UserInfoDetails'

export class EConnexion {
  private readonly token: string

  constructor (token: string) {
    this.token = token
  }

  public async getUserInfo (): Promise<UserInfo> {
    return await GRDF.request(this.token, 'e-connexion/users/whoami')
  }

  public async getUserDetails (id: number): Promise<UserInfo> {
    return await GRDF.request(this.token, `e-connexion/users/${id}`)
  }

  public async putUserDetails (id: number, userInfoDetails: UserInfoDetails): Promise<UserInfo> {
    return await GRDF.request(this.token, `e-connexion/users/${id}`, {
      method: 'PUT',
      data: userInfoDetails
    })
  }
}
