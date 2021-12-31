import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import AuthResponse from './components/Auth/AuthResponse'
import { UserInfo } from './components/User/UserInfo'
import { UserInfoDetails } from './components/User/UserInfoDetails'
import { PCE } from './components/PCE/PCE'
import { Adresse } from './components/PCE/Adresse'
import { PCECoefficient } from './components/PCE/Coefficient'
import { ConsommationReference } from './components/PCE/ConsommationReference'
import { Consommation, ConsommationType } from './components/PCE/Consommation'
import { Frequency } from './components/PCE/Frequency'
import stream from 'node:stream'
import { HistoriqueConsultation } from './components/User/HistoriqueConsultation'

export {Frequency}
export {ConsommationType}


/**
 * Support non-officiel de l'API GRDF
 * @example ```js
 * const { GRDF, ConsommationType } = require('grdf-api')
 * const pce = '01234567890123'
 * GRDF.login('email', 'password').then(async token => {
 *     const user = new GRDF(token)
 *     const consommation = await user.getPCEConsumption(ConsommationType.informatives, [pce], '2021-09-01', '2021-12-01')
 *     console.log(consommation[pce].releves)
 * })
 * ```
 */
export class GRDF {
  private readonly token: string

  /**
   * @param {string} token Jeton d'accès obtenu avec la méthode `GRDF.login(email, password)`
   */
  constructor (token: string) {
    this.token = token
  }

  /**
   * Informations générales sur l'utilisateur connecté
   * @return {Promise<UserInfo>}
   */
  public async getUserInfo (): Promise<UserInfo> {
    return await this.request('e-connexion/users/whoami')
  }

  /**
   * Détails sur un utilisateur
   * @param {number} id Identifiant de l'utilisateur
   * @return {Promise<UserInfo>}
   */
  public async getUserDetails (id: number): Promise<UserInfo> {
    return await this.request(`e-connexion/users/${id}`)
  }

  /**
   * Mise à jour du profil de l'utilisateur
   * @param {number} id Identifiant de l'utilisateur
   * @param {UserInfoDetails} userInfoDetails Les informations de l'utilisateur à modifier
   * @return {Promise<UserInfo>}
   */
  public async putUserDetails (id: number, userInfoDetails: UserInfoDetails): Promise<UserInfo> {
    return await this.request(`e-connexion/users/${id}`, {
      method: 'PUT',
      data: userInfoDetails
    })
  }

  /**
   * Historique de consultation des informations du PCE
   * @return {Promise<HistoriqueConsultation[]>}
   */
  public async getConsultationHistory (): Promise<HistoriqueConsultation[]> {
    return await this.request('e-connexion/users/pce/historique-consultation')
  }

  /**
   * Liste des PCE associés à l'utilisateur
   * @return {Promise<PCE[]>}
   */
  public async getPCEList (): Promise<PCE[]> {
    return await this.request('/e-conso/pce')
  }

  /**
   * Adresse d'un PCE spécifique
   * @param {string} pce Numéro du PCE
   * @return {Promise<Adresse>}
   */
  public async getPCEAddress (pce: string): Promise<Adresse> {
    return await this.request(`/e-conso/pce/${pce}/adresse`)
  }

  /**
   * Détails d'un PCE
   * @param {string} pce Numéro du PCE
   * @return {Promise<PCE>}
   */
  public async getPCEDetails (pce: string): Promise<PCE> {
    return await this.request(`/e-conso/pce/${pce}/details`)
  }

  /**
   * Informations les plus détaillées sur les PCE associés à l'utilisateur
   * @return {Promise<PCE[]>}
   */
  public async getPCEDetailsPlus (): Promise<PCE[]> {
    return await this.request('/e-conso/details')
  }

  /**
   * @param {string} pce Numéro du PCE
   * @return {Promise<PCECoefficient>}
   */
  public async getPCECoefficient (pce: string): Promise<PCECoefficient> {
    return await this.request(`/e-conso/pce/${pce}/coefficient-profil-mensuel`)
  }

  /**
   *
   * @param {string} pce Numéro du PCE
   * @param {string} dateFinPeriode Date de fin au format YYYY-MM-DD
   * @param {number} nbJour Nombre de jour
   * @return Objet dont les clés sont les dates et les valeurs sont les températures associées
   */
  public async getPCEMeteo (pce: string, dateFinPeriode: string, nbJour: number): Promise<{ [date: string]: number }> {
    return await this.request(`/e-conso/pce/${pce}/meteo?${qs.stringify({ dateFinPeriode, nbJour })}`)
  }

  /**
   * Consommation annuelle de référence
   * @param {string} pce Numéro du PCE
   * @return {Promise<ConsommationReference[]>}
   */
  public async getPCEConsoRef (pce: string): Promise<ConsommationReference[]> {
    return await this.request(`/e-conso/pce/${pce}/consommation-anuelle-reference`)
  }

  /**
   * Relevés de consommation
   * @param {ConsommationType} type informatives: les plus détaillés, publiees: destinées à la facturation
   * @param {string[]} pceList Liste des numéros de PCE
   * @param {string} dateDebut Date de début au format YYYY-MM-DD
   * @param {string} dateFin Date de fin au format YYYY-MM-DD
   * @return {Promise<Consommation>}
   */
  public async getPCEConsumption (type: ConsommationType, pceList: string[], dateDebut: string, dateFin: string): Promise<Consommation> {
    return await this.request(`/e-conso/pce/consommation/informatives?${qs.stringify({
      dateDebut,
      dateFin,
      pceList
    })}`)
  }

  /**
   * Stream d'une feuille de calcul déjà formatée contenant les relevés
   * @param {ConsommationType} type `informatives`: les plus détaillés, `publiees`: destinées à la facturation
   * @param {string[]} pceList Liste des numéros de PCE
   * @param {Frequency} frequence Fréquence des relevés (`Mensuel`, `Hebdomadaire`, `Journalier`, `Horaire`)
   * @param {string} dateDebut Date de début au format YYYY-MM-DD
   * @param {string} dateFin Date de fin au format YYYY-MM-DD
   * @return {Promise<stream>}
   */
  public async getConsumptionSheet (type: ConsommationType, pceList: string[], frequence: Frequency, dateDebut: string, dateFin: string): Promise<stream> {
    return await this.request(`/e-conso/pce/consommation/${type}/telecharger?${qs.stringify({
      dateDebut,
      frequence,
      dateFin,
      pceList
    })}`, { responseType: 'stream' })
  }

  private async request (endpoint: string, axiosConfig: AxiosRequestConfig = {}): Promise<any> {
    const { data, headers } = await axios.request({
      baseURL: 'https://monespace.grdf.fr/api',
      url: endpoint,
      ...axiosConfig,
      headers: {
        Cookie: `auth_token=${this.token}`
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
