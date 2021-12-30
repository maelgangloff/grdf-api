import { PCE } from './PCE/PCE'
import { Adresse } from './PCE/Adresse'
import { PCECoefficient } from './PCE/Coefficient'
import qs from 'qs'
import { ConsommationReference } from './PCE/ConsommationReference'
import { Consommation, ConsommationType } from './PCE/Consommation'
import { Frequency } from './PCE/Frequency'
import stream from 'node:stream'
import { GRDF } from '../index'

export class EConso {
  private readonly token

  constructor (token: string) {
    this.token = token
  }

  public async getPCEList (): Promise<PCE[]> {
    return await GRDF.request(this.token, '/e-conso/pce')
  }

  public async getPCEAddress (pce: string): Promise<Adresse> {
    return await GRDF.request(this.token, `/e-conso/pce/${pce}/adresse`)
  }

  public async getPCEDetails (pce: string): Promise<PCE> {
    return await GRDF.request(this.token, `/e-conso/pce/${pce}/details`)
  }

  public async getPCEDetailsPlus (): Promise<PCE[]> {
    return await GRDF.request(this.token, '/e-conso/details')
  }

  public async getPCECoefficient (pce: string): Promise<PCECoefficient> {
    return await GRDF.request(this.token, `/e-conso/pce/${pce}/coefficient-profil-mensuel`)
  }

  public async getPCEMeteo (pce: string, dateFinPeriode: string, nbJour: number): Promise<{ [date: string]: number }> {
    return await GRDF.request(this.token, `/e-conso/pce/${pce}/meteo?${qs.stringify({ dateFinPeriode, nbJour })}`)
  }

  public async getPCEConsoRef (pce: string): Promise<ConsommationReference[]> {
    return await GRDF.request(this.token, `/e-conso/pce/${pce}/consommation-anuelle-reference`)
  }

  public async getPCEConsumption (type: ConsommationType, pceList: string[], dateDebut: string, dateFin: string): Promise<Consommation> {
    return await GRDF.request(this.token, `/e-conso/pce/consommation/informatives?${qs.stringify({
            dateDebut,
            dateFin,
            pceList
        })}`)
  }

  public async getConsumptionSheet (type: ConsommationType, pceList: string[], frequence: Frequency, dateDebut: string, dateFin: string): Promise<stream> {
    return await GRDF.request(this.token, `/e-conso/pce/consommation/${type}/telecharger?${qs.stringify({
            dateDebut,
            frequence,
            dateFin,
            pceList
        })}`, { responseType: 'stream' })
  }
}
