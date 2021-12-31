<a name="GRDF"></a>

## GRDF
Support non-officiel de l'API GRDF

**Kind**: global class  

* [GRDF](#GRDF)
    * [new GRDF(token)](#new_GRDF_new)
    * [.getUserInfo()](#GRDF+getUserInfo) ⇒ <code>Promise.&lt;UserInfo&gt;</code>
    * [.getUserDetails(id)](#GRDF+getUserDetails) ⇒ <code>Promise.&lt;UserInfo&gt;</code>
    * [.putUserDetails(id, userInfoDetails)](#GRDF+putUserDetails) ⇒ <code>Promise.&lt;UserInfo&gt;</code>
    * [.getConsultationHistory()](#GRDF+getConsultationHistory) ⇒ <code>Promise.&lt;Array.&lt;HistoriqueConsultation&gt;&gt;</code>
    * [.getPCEList()](#GRDF+getPCEList) ⇒ <code>Promise.&lt;Array.&lt;PCE&gt;&gt;</code>
    * [.getPCEAddress(pce)](#GRDF+getPCEAddress) ⇒ <code>Promise.&lt;Adresse&gt;</code>
    * [.getPCEDetails(pce)](#GRDF+getPCEDetails) ⇒ <code>Promise.&lt;PCE&gt;</code>
    * [.getPCEDetailsPlus()](#GRDF+getPCEDetailsPlus) ⇒ <code>Promise.&lt;Array.&lt;PCE&gt;&gt;</code>
    * [.getPCECoefficient(pce)](#GRDF+getPCECoefficient) ⇒ <code>Promise.&lt;PCECoefficient&gt;</code>
    * [.getPCEMeteo(pce, dateFinPeriode, nbJour)](#GRDF+getPCEMeteo) ⇒
    * [.getPCEConsoRef(pce)](#GRDF+getPCEConsoRef) ⇒ <code>Promise.&lt;Array.&lt;ConsommationReference&gt;&gt;</code>
    * [.getPCEConsumption(type, pceList, dateDebut, dateFin)](#GRDF+getPCEConsumption) ⇒ <code>Promise.&lt;Consommation&gt;</code>
    * [.getConsumptionSheet(type, pceList, frequence, dateDebut, dateFin)](#GRDF+getConsumptionSheet) ⇒ <code>Promise.&lt;stream&gt;</code>

<a name="new_GRDF_new"></a>

### new GRDF(token)

| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | Jeton d'accès obtenu avec la méthode `GRDF.login(email, password)` |

**Example**  
```js
const { GRDF, ConsommationType } = require('grdf-api')
const pce = '01234567890123'
GRDF.login('email', 'password').then(async token => {
    const user = new GRDF(token)
    const consommation = await user.getPCEConsumption(ConsommationType.informatives, [pce], '2021-09-01', '2021-12-01')
    console.log(consommation[pce].releves)
})
```
<a name="GRDF+getUserInfo"></a>

### grdF.getUserInfo() ⇒ <code>Promise.&lt;UserInfo&gt;</code>
Informations générales sur l'utilisateur connecté

**Kind**: instance method of [<code>GRDF</code>](#GRDF)  
<a name="GRDF+getUserDetails"></a>

### grdF.getUserDetails(id) ⇒ <code>Promise.&lt;UserInfo&gt;</code>
Détails sur un utilisateur

**Kind**: instance method of [<code>GRDF</code>](#GRDF)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Identifiant de l'utilisateur |

<a name="GRDF+putUserDetails"></a>

### grdF.putUserDetails(id, userInfoDetails) ⇒ <code>Promise.&lt;UserInfo&gt;</code>
Mise à jour du profil de l'utilisateur

**Kind**: instance method of [<code>GRDF</code>](#GRDF)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Identifiant de l'utilisateur |
| userInfoDetails | <code>UserInfoDetails</code> | Les informations de l'utilisateur à modifier |

<a name="GRDF+getConsultationHistory"></a>

### grdF.getConsultationHistory() ⇒ <code>Promise.&lt;Array.&lt;HistoriqueConsultation&gt;&gt;</code>
Historique de consultation des informations du PCE

**Kind**: instance method of [<code>GRDF</code>](#GRDF)  
<a name="GRDF+getPCEList"></a>

### grdF.getPCEList() ⇒ <code>Promise.&lt;Array.&lt;PCE&gt;&gt;</code>
Liste des PCE associés à l'utilisateur

**Kind**: instance method of [<code>GRDF</code>](#GRDF)  
<a name="GRDF+getPCEAddress"></a>

### grdF.getPCEAddress(pce) ⇒ <code>Promise.&lt;Adresse&gt;</code>
Adresse d'un PCE spécifique

**Kind**: instance method of [<code>GRDF</code>](#GRDF)  

| Param | Type | Description |
| --- | --- | --- |
| pce | <code>string</code> | Numéro du PCE |

<a name="GRDF+getPCEDetails"></a>

### grdF.getPCEDetails(pce) ⇒ <code>Promise.&lt;PCE&gt;</code>
Détails d'un PCE

**Kind**: instance method of [<code>GRDF</code>](#GRDF)  

| Param | Type | Description |
| --- | --- | --- |
| pce | <code>string</code> | Numéro du PCE |

<a name="GRDF+getPCEDetailsPlus"></a>

### grdF.getPCEDetailsPlus() ⇒ <code>Promise.&lt;Array.&lt;PCE&gt;&gt;</code>
Informations les plus détaillées sur les PCE associés à l'utilisateur

**Kind**: instance method of [<code>GRDF</code>](#GRDF)  
<a name="GRDF+getPCECoefficient"></a>

### grdF.getPCECoefficient(pce) ⇒ <code>Promise.&lt;PCECoefficient&gt;</code>
**Kind**: instance method of [<code>GRDF</code>](#GRDF)  

| Param | Type | Description |
| --- | --- | --- |
| pce | <code>string</code> | Numéro du PCE |

<a name="GRDF+getPCEMeteo"></a>

### grdF.getPCEMeteo(pce, dateFinPeriode, nbJour) ⇒
**Kind**: instance method of [<code>GRDF</code>](#GRDF)  
**Returns**: Objet dont les clés sont les dates et les valeurs sont les températures associées  

| Param | Type | Description |
| --- | --- | --- |
| pce | <code>string</code> | Numéro du PCE |
| dateFinPeriode | <code>string</code> | Date de fin au format YYYY-MM-DD |
| nbJour | <code>number</code> | Nombre de jour |

<a name="GRDF+getPCEConsoRef"></a>

### grdF.getPCEConsoRef(pce) ⇒ <code>Promise.&lt;Array.&lt;ConsommationReference&gt;&gt;</code>
Consommation annuelle de référence

**Kind**: instance method of [<code>GRDF</code>](#GRDF)  

| Param | Type | Description |
| --- | --- | --- |
| pce | <code>string</code> | Numéro du PCE |

<a name="GRDF+getPCEConsumption"></a>

### grdF.getPCEConsumption(type, pceList, dateDebut, dateFin) ⇒ <code>Promise.&lt;Consommation&gt;</code>
Relevés de consommation

**Kind**: instance method of [<code>GRDF</code>](#GRDF)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>ConsommationType</code> | informatives: les plus détaillés, publiees: destinées à la facturation |
| pceList | <code>Array.&lt;string&gt;</code> | Liste des numéros de PCE |
| dateDebut | <code>string</code> | Date de début au format YYYY-MM-DD |
| dateFin | <code>string</code> | Date de fin au format YYYY-MM-DD |

<a name="GRDF+getConsumptionSheet"></a>

### grdF.getConsumptionSheet(type, pceList, frequence, dateDebut, dateFin) ⇒ <code>Promise.&lt;stream&gt;</code>
Stream d'une feuille de calcul déjà formatée contenant les relevés

**Kind**: instance method of [<code>GRDF</code>](#GRDF)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>ConsommationType</code> | `informatives`: les plus détaillés, `publiees`: destinées à la facturation |
| pceList | <code>Array.&lt;string&gt;</code> | Liste des numéros de PCE |
| frequence | <code>Frequency</code> | Fréquence des relevés (`Mensuel`, `Hebdomadaire`, `Journalier`, `Horaire`) |
| dateDebut | <code>string</code> | Date de début au format YYYY-MM-DD |
| dateFin | <code>string</code> | Date de fin au format YYYY-MM-DD |

