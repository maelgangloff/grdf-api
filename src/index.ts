import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import stream from 'node:stream'
import { OktaAuth } from '@okta/okta-auth-js'
import { wrapper } from 'axios-cookiejar-support'
import { CookieJar } from 'tough-cookie'

import { UserInfo } from './components/User/UserInfo'
import { PCE, Adresse, Consommation, ConsommationReference, ConsommationType, Frequency, PCECoefficient, Seuils, SeuilsCreated } from './components/PCE'
import { Accreditation, HistoriqueConsultation, HistoriqueConsultationRequest, InfoLogement } from './components/User'

import { HTMLResponseError } from './components/Errors'

/**
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
   * Liste des PCE associés à l'utilisateur
   * @param {boolean} details Récupérer les détails
   * @return {Promise<PCE[]>}
   */
  public async getPCEList (details = true): Promise<PCE[]> {
    return await this.request('/e-conso/pce?' + qs.stringify({ details }))
  }

  /**
   * Adresse d'un PCE spécifique
   * @param {string} pce Identifiant du PCE
   * @return {Promise<Adresse>}
   */
  public async getPCEAddress (pce: string): Promise<Adresse> {
    return await this.request(`/e-conso/pce/${pce}/adresse`)
  }

  /**
   * Détails d'un PCE
   * @param {string} pce Identifiant du PCE
   * @return {Promise<PCE>}
   */
  public async getPCEDetails (pce: string): Promise<PCE> {
    return await this.request(`/e-conso/pce/${pce}/details`)
  }

  /**
   * Informations les plus détaillées sur les PCE associés à l'utilisateur
   * @deprecated
   * @return {Promise<PCE[]>}
   */
  public async getPCEDetailsPlus (): Promise<PCE[]> {
    return await this.request('/e-conso/details')
  }

  /**
   * @param {string} pce Identifiant du PCE
   * @return {Promise<PCECoefficient>}
   */
  public async getPCECoefficient (pce: string): Promise<PCECoefficient> {
    return await this.request(`/e-conso/pce/${pce}/coefficient-profil-mensuel`)
  }

  /**
   * @param {string} pce Identifiant du PCE
   * @param {string} dateFinPeriode Date de fin au format YYYY-MM-DD
   * @param {number} nbJours Nombre de jours
   * @return Objet dont les clés sont les dates et les valeurs sont les températures associées
   */
  public async getPCEMeteo (pce: string, dateFinPeriode: string, nbJours: number): Promise<{ [date: string]: number }> {
    return await this.request(`/e-conso/pce/${pce}/meteo?${qs.stringify({
      dateFinPeriode,
      nbJours
    })}`)
  }

  /**
   * Consommation annuelle de référence
   * @param {string} pce Identifiant du PCE
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
   * @param {Frequency} frequence Fréquence des relevés (`Mensuel`|`Hebdomadaire`|`Journalier`|`Horaire`)
   * @param {string} dateDebut Date de début au format YYYY-MM-DD
   * @param {string} dateFin Date de fin au format YYYY-MM-DD
   * @example ```js
   * const { GRDF, ConsommationType, Frequency } = require('grdf-api');
   * const fs = require('fs');
   *
   * const pce = '01234567890123';
   * GRDF.login('email', 'password').then(async token => {
   *     const user = new GRDF(token);
   *     const stream = fs.createWriteStream('./sheet.xlsx');
   *     (await user.getConsumptionSheet(ConsommationType.informatives, [pce], Frequency.WEEKLY, '2022-06-01', '2022-10-10')).pipe(stream);
   * })
   * ```
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

  /**
   * Effectuer des changements sur le PCE (changement de l'alias par exemple)
   * @param {string} pce Identifiant du PCE
   * @param partialPCE Informations à remplacer dans la description du PCE
   * @return {Promise<PCE>}
   */
  public async putPCE (pce: string, partialPCE: Partial<PCE> & { alias: string, role: string }): Promise<PCE> {
    return await this.request(`/e-conso/pce/${pce}`, {
      method: 'PUT',
      data: partialPCE
    })
  }

  /**
   * Liste des seuils programmés
   * @param {string} pce Identifiant du PCE
   * @param {Frequency} frequence Type de seuil (`Journalier`|`Mensuel`|`Annuel`)
   * @return {Promise<Seuils>}
   */
  public async getPCESeuils (pce: string, frequence: Frequency): Promise<Seuils> {
    return await this.request(`/e-conso/pce/${pce}/seuils?${qs.stringify({ frequence })}`)
  }

  /**
   * Remplacer les seuils
   * @param {string} pce Identifiant du PCE
   * @param {Seuils} seuils Seuils à poster
   * @return {Promise<SeuilsCreated>}
   */
  public async postPCESeuils (pce: string, seuils: Seuils): Promise<SeuilsCreated> {
    return await this.request(`/e-conso/pce/${pce}/seuils`, {
      method: 'POST',
      data: seuils
    })
  }

  /**
   * Modifier un seuil (préciser les identifiants)
   * @param {string} pce Identifiant du PCE
   * @param {Seuils} seuils Seuils à muter
   * @return {Promise<Seuils>}
   */
  public async putPCESeuils (pce: string, seuils: Seuils): Promise<Seuils> {
    return await this.request(`/e-conso/pce/${pce}/seuils`, {
      method: 'PUT',
      data: seuils
    })
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
  public async putUserDetails (id: number, userInfoDetails: UserInfo): Promise<UserInfo> {
    return await this.request(`e-connexion/users/${id}`, {
      method: 'PUT',
      data: userInfoDetails
    })
  }

  /**
   * Historique de consultation des informations des PCE
   * @return {Promise<HistoriqueConsultation[]>}
   */
  public async getConsultationHistory (): Promise<HistoriqueConsultation[]> {
    return await this.request('e-connexion/users/pce/historique-consultation')
  }

  /**
   * Mise à jour de la date de dernière consultation du PCE
   * @param {HistoriqueConsultationRequest} data
   */
  public async putConsultationHistory (data: HistoriqueConsultationRequest): Promise<HistoriqueConsultation[]> {
    return await this.request('e-connexion/users/pce/historique-consultation', {
      method: 'PUT',
      data
    })
  }

  /**
   * Liste des accreditations demandées
   * @return {Promise<Accreditation[]>}
   */
  public async getUserAccreditation (): Promise<Accreditation[]> {
    return await this.request('e-connexion/user-accreditations')
  }

  /**
   * Mise à jour de l'accréditation (changement de l'alias par exemple)
   * @param {string} pce Identifiant du PCE
   * @param partialPCE
   * @return {Promise<PCE>}
   */
  public async putUserAccreditation (pce: string, partialPCE: Partial<PCE> & { alias: string, role: string }): Promise<PCE> {
    return await this.request(`e-connexion/user-accreditations/${pce}`, {
      method: 'PUT',
      data: partialPCE
    })
  }

  public async getUserCompensations (): Promise<object> {
    return await this.request('e-connexion/user-compensations')
  }

  /**
   * Informations sur le logement
   * @return {Promise<InfoLogement[]>}
   */
  public async getInfoLogements (): Promise<InfoLogement[]> {
    return await this.request('e-connexion/info_logements')
  }

  /**
   * Informations sur le logement d'un PCE
   * @return {Promise<InfoLogement>}
   */
  public async getInfoLogementPCE (pce: string): Promise<InfoLogement> {
    return await this.request(`e-connexion/info_logements?${qs.stringify({ pce })}`)
  }

  private async request (endpoint: string, axiosConfig: AxiosRequestConfig = {}): Promise<any> {
    const config = {
      baseURL: 'https://monespace.grdf.fr/api',
      url: endpoint,
      ...axiosConfig,
      headers: {
        domain: 'grdf.fr',
        Cookie: `auth_token=${this.token}`
      }
    }
    try {
      const { data, headers } = await axios.request(config)
      if (headers['content-type'].includes('text/html')) throw new HTMLResponseError()
      return data
    } catch (e) {
      if (!(e instanceof HTMLResponseError)) throw e

      const { data, headers } = await axios.request(config)
      if (headers['content-type'].includes('text/html')) throw new HTMLResponseError()
      return data
    }
  }

  /**
   * Obtention d'un jeton d'accès auprès de l'API
   * Attention: ne JAMAIS transmettre ce jeton à un tier, il vous est strictement personnel !
   * @param {string} email Courriel de connexion de l'utilisateur
   * @param {string} password Mot de passe
   * @static
   * @return {Promise<string>} Le jeton d'accès
   */
  public static async login (email: string, password: string): Promise<string> {
    const authClient = new OktaAuth({
      issuer: 'https://connexion.grdf.fr/oauth2/aus5y2ta2uEHjCWIR417',
      clientId: '0oa95ese18blzdg3p417',
      redirectUri: 'https://monespace.grdf.fr/_codexch',
      scopes: ['openid', 'profile', 'email']

    })
    const transaction = await authClient.signIn({
      username: email,
      password: password
    })

    const jar = new CookieJar()

    const httpClient = wrapper(axios.create({ withCredentials: true, jar }))
    await httpClient.get(authClient.getIssuerOrigin() + `/login/sessionCookieRedirect?${qs.stringify({
      checkAccountSetupComplete: true,
      token: transaction.sessionToken,
      redirectUrl: 'https://monespace.grdf.fr'
    })}`)
    const cookie = (await jar.getCookies('https://monespace.grdf.fr')).find(c => c.key === 'auth_token')
    if (cookie === undefined) throw new Error("Impossible de récupérer le cookie d'authentification.")
    return cookie.value
  }
}

export { Frequency }
export { ConsommationType }
