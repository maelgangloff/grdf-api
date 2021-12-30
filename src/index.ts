import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import AuthResponse from './components/Auth/AuthResponse'
import { EConso } from './components/EConso'
import { EConnexion } from './components/EConnexion'

export class GRDF {
  public EConso: EConso
  public EConnexion: EConnexion

  constructor (token: string) {
    this.EConso = new EConso(token)
    this.EConnexion = new EConnexion(token)
  }

  public static async request (token: string, endpoint: string, axiosConfig: AxiosRequestConfig = {}): Promise<any> {
    const { data, headers } = await axios.request({
      baseURL: 'https://monespace.grdf.fr/api',
      url: endpoint,
      ...axiosConfig,
      headers: {
        Cookie: `auth_token=${token}`
      }
    })
    if (headers['content-type'].includes('text/html')) throw new Error('Useless response')
    return data
  }

  public static async login (email: string, password: string): Promise<string> {
    const authReq = (await axios.post('https://login.monespace.grdf.fr/sofit-account-api/api/v1/auth', qs.stringify({
      email,
      password,
      capp: 'meg',
      goto: `https://sofa-connexion.grdf.fr/openam/oauth2/externeGrdf/authorize?${qs.stringify({
                response_type: 'code',
                scope: 'openid profile email infotravaux /v1/accreditation /v1/accreditations /digiconso/v1 /digiconso/v1/consommations new_meg',
                client_id: 'prod_espaceclient',
                state: 0,
                redirect_uri: 'https://monespace.grdf.fr/_codexch',
                nonce: 'skywsNPCVa-AeKo1Rps0HjMVRNbUqA46j7XYA4tImeI',
                by_pass_okta: 1,
                capp: 'meg'
            })}`
    })))

    const { redirectUrl, displayCaptcha, state, actualLockoutDuration } = authReq.data as AuthResponse

    if (!displayCaptcha && state === 'SUCCESS' && actualLockoutDuration === 0 && redirectUrl !== undefined) {
      const token = (await axios.get(redirectUrl, {
        headers: {
          Cookie: authReq.headers['set-cookie']?.find(c => c.startsWith('iPlanetDirectoryPro'))?.split(';')[0] ?? ''
        },
        validateStatus: status => status === 302
      })).headers['set-cookie']?.find(c => c.startsWith('auth_token'))?.split(';')[0].split('=')[1]
      if (token !== undefined) {
        await axios.get('https://monespace.grdf.fr/api/e-connexion/users/whoami', { headers: { Cookie: `auth_token=${token}` } })
        return token
      }
    }
    throw new Error('Invalid credentials or captcha required.')
  }
}
