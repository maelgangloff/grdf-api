# grdf-api

[![view on npm](https://img.shields.io/npm/v/grdf-api.svg?style=flat-square)](https://www.npmjs.org/package/grdf-api)
![GitHub CI](https://github.com/maelgangloff/grdf-api/actions/workflows/CI.yml/badge.svg)
[![npm](https://img.shields.io/npm/dm/grdf-api?style=flat-square)](https://npm-stat.com/charts.html?package=grdf-api)

Support non-officiel de l'API GRDF.  
Ce module permet de gérer et récupérer la consommation des compteurs communicants Gazpar en utilisant l'API du site de GRDF. Leur site internet étant en perpétuelle mutation, ce module devra être mis à jour régulièrement.

> [!WARNING]
> ## Disclaimer
> - Il est clairement mentionné que cette librairie n'est pas officiellement éditée par GRDF.
> - Ce module n'est pas une contrefaçon car il n'existe pas de module similaire édité officiellement.
> - Les utilisateurs ne peuvent accéder qu'à leurs propres données. Ils sont soumis au même processus d'authentification que celui implémenté dans l'espace client GRDF et imposé par le serveur API.
> - Les données des utilisateurs ne sont pas davantage exposées puisqu'un utilisateur ne peut accéder qu'à ses propres données. Personne n'a le contrôle sur cette limitation qui est inhérente au fonctionnement de l'API des serveurs de GRDF.
> - Cette librairie ne se suffit pas à elle-même pour fonctionner. Il est nécessaire de l'importer dans un projet et l'utilisateur est le seul responsable de son code et des éventuelles conséquences.
> - Tout utilisateur de cette librairie a *a priori* lu et approuvé l'entièreté du fichier de licence GPLv3 disponible publiquement [LICENSE](https://github.com/maelgangloff/grdf-api/blob/master/LICENSE) ainsi que de ce présent fichier de présentation.
> - Tout utilisateur de cette librairie a *a priori* lu et compris l'entièreté du code de ce projet avant toute utilisation.
> - L'auteur de ce projet n'agit pas en tant qu'intermédiaire de traitement des données au sens du RGPD. Les utilisateurs sont responsables de leur propre conformité au RGPD lors de l'utilisation de cette librairie. Ils doivent s'assurer que leur utilisation de cette librairie est conforme aux exigences du RGPD et de toute autre législation applicable en matière de protection des données.
> - Eu égard l'ensemble de ces remarques, les contributeurs et *a fortiori* l'auteur du projet ne peuvent être tenus responsables de tout dommage potentiel.

<a name="GRDF"></a>

## GRDF
**Kind**: global class  

* [GRDF](#GRDF)
    * [new GRDF(token)](#new_GRDF_new)
    * _instance_
        * [.getPCEList(details)](#GRDF+getPCEList) ⇒ <code>Promise.&lt;Array.&lt;PCE&gt;&gt;</code>
        * [.getPCEAddress(pce)](#GRDF+getPCEAddress) ⇒ <code>Promise.&lt;Adresse&gt;</code>
        * [.getPCEDetails(pce)](#GRDF+getPCEDetails) ⇒ <code>Promise.&lt;PCE&gt;</code>
        * ~~[.getPCEDetailsPlus()](#GRDF+getPCEDetailsPlus) ⇒ <code>Promise.&lt;Array.&lt;PCE&gt;&gt;</code>~~
        * [.getPCECoefficient(pce)](#GRDF+getPCECoefficient) ⇒ <code>Promise.&lt;PCECoefficient&gt;</code>
        * [.getPCEMeteo(pce, dateFinPeriode, nbJours)](#GRDF+getPCEMeteo) ⇒
        * [.getPCEConsoRef(pce)](#GRDF+getPCEConsoRef) ⇒ <code>Promise.&lt;Array.&lt;ConsommationReference&gt;&gt;</code>
        * [.getPCEConsumption(type, pceList, dateDebut, dateFin)](#GRDF+getPCEConsumption) ⇒ <code>Promise.&lt;Consommation&gt;</code>
        * [.getConsumptionSheet(type, pceList, frequence, dateDebut, dateFin)](#GRDF+getConsumptionSheet) ⇒ <code>Promise.&lt;stream&gt;</code>
        * [.putPCE(pce, partialPCE)](#GRDF+putPCE) ⇒ <code>Promise.&lt;PCE&gt;</code>
        * [.getPCESeuils(pce, frequence)](#GRDF+getPCESeuils) ⇒ <code>Promise.&lt;Seuils&gt;</code>
        * [.postPCESeuils(pce, seuils)](#GRDF+postPCESeuils) ⇒ <code>Promise.&lt;SeuilsCreated&gt;</code>
        * [.putPCESeuils(pce, seuils)](#GRDF+putPCESeuils) ⇒ <code>Promise.&lt;Seuils&gt;</code>
        * [.getUserInfo()](#GRDF+getUserInfo) ⇒ <code>Promise.&lt;UserInfo&gt;</code>
        * [.getUserDetails(id)](#GRDF+getUserDetails) ⇒ <code>Promise.&lt;UserInfo&gt;</code>
        * [.putUserDetails(id, userInfoDetails)](#GRDF+putUserDetails) ⇒ <code>Promise.&lt;UserInfo&gt;</code>
        * [.getConsultationHistory()](#GRDF+getConsultationHistory) ⇒ <code>Promise.&lt;Array.&lt;HistoriqueConsultation&gt;&gt;</code>
        * [.putConsultationHistory(data)](#GRDF+putConsultationHistory)
        * [.getUserAccreditation()](#GRDF+getUserAccreditation) ⇒ <code>Promise.&lt;Array.&lt;Accreditation&gt;&gt;</code>
        * [.putUserAccreditation(pce, partialPCE)](#GRDF+putUserAccreditation) ⇒ <code>Promise.&lt;PCE&gt;</code>
        * [.getInfoLogements()](#GRDF+getInfoLogements) ⇒ <code>Promise.&lt;Array.&lt;InfoLogement&gt;&gt;</code>
        * [.getInfoLogementPCE()](#GRDF+getInfoLogementPCE) ⇒ <code>Promise.&lt;InfoLogement&gt;</code>
    * _static_
        * [.login(email, password)](#GRDF.login) ⇒ <code>Promise.&lt;string&gt;</code>

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
<a name="GRDF+getPCEList"></a>

### grdF.getPCEList(details) ⇒ <code>Promise.&lt;Array.&lt;PCE&gt;&gt;</code>
Liste des PCE associés à l'utilisateur

**Kind**: instance method of [<code>GRDF</code>](#GRDF)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| details | <code>boolean</code> | <code>true</code> | Récupérer les détails |

<a name="GRDF+getPCEAddress"></a>

### grdF.getPCEAddress(pce) ⇒ <code>Promise.&lt;Adresse&gt;</code>
Adresse d'un PCE spécifique

**Kind**: instance method of [<code>GRDF</code>](#GRDF)  

| Param | Type | Description |
| --- | --- | --- |
| pce | <code>string</code> | Identifiant du PCE |

<a name="GRDF+getPCEDetails"></a>

### grdF.getPCEDetails(pce) ⇒ <code>Promise.&lt;PCE&gt;</code>
Détails d'un PCE

**Kind**: instance method of [<code>GRDF</code>](#GRDF)  

| Param | Type | Description |
| --- | --- | --- |
| pce | <code>string</code> | Identifiant du PCE |

<a name="GRDF+getPCEDetailsPlus"></a>

### ~~grdF.getPCEDetailsPlus() ⇒ <code>Promise.&lt;Array.&lt;PCE&gt;&gt;</code>~~
***Deprecated***

Informations les plus détaillées sur les PCE associés à l'utilisateur

**Kind**: instance method of [<code>GRDF</code>](#GRDF)  
<a name="GRDF+getPCECoefficient"></a>

### grdF.getPCECoefficient(pce) ⇒ <code>Promise.&lt;PCECoefficient&gt;</code>
**Kind**: instance method of [<code>GRDF</code>](#GRDF)  

| Param | Type | Description |
| --- | --- | --- |
| pce | <code>string</code> | Identifiant du PCE |

<a name="GRDF+getPCEMeteo"></a>

### grdF.getPCEMeteo(pce, dateFinPeriode, nbJours) ⇒
**Kind**: instance method of [<code>GRDF</code>](#GRDF)  
**Returns**: Objet dont les clés sont les dates et les valeurs sont les températures associées  

| Param | Type | Description |
| --- | --- | --- |
| pce | <code>string</code> | Identifiant du PCE |
| dateFinPeriode | <code>string</code> | Date de fin au format YYYY-MM-DD |
| nbJours | <code>number</code> | Nombre de jours |

<a name="GRDF+getPCEConsoRef"></a>

### grdF.getPCEConsoRef(pce) ⇒ <code>Promise.&lt;Array.&lt;ConsommationReference&gt;&gt;</code>
Consommation annuelle de référence

**Kind**: instance method of [<code>GRDF</code>](#GRDF)  

| Param | Type | Description |
| --- | --- | --- |
| pce | <code>string</code> | Identifiant du PCE |

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
| frequence | <code>Frequency</code> | Fréquence des relevés (`Mensuel`|`Hebdomadaire`|`Journalier`|`Horaire`) |
| dateDebut | <code>string</code> | Date de début au format YYYY-MM-DD |
| dateFin | <code>string</code> | Date de fin au format YYYY-MM-DD |

**Example**  
```js
const { GRDF, ConsommationType, Frequency } = require('grdf-api');
const fs = require('fs');

const pce = '01234567890123';
GRDF.login('email', 'password').then(async token => {
    const user = new GRDF(token);
    const stream = fs.createWriteStream('./sheet.xlsx');
    (await user.getConsumptionSheet(ConsommationType.informatives, [pce], Frequency.WEEKLY, '2022-06-01', '2022-10-10')).pipe(stream);
})
```
<a name="GRDF+putPCE"></a>

### grdF.putPCE(pce, partialPCE) ⇒ <code>Promise.&lt;PCE&gt;</code>
Effectuer des changements sur le PCE (changement de l'alias par exemple)

**Kind**: instance method of [<code>GRDF</code>](#GRDF)  

| Param | Type | Description |
| --- | --- | --- |
| pce | <code>string</code> | Identifiant du PCE |
| partialPCE |  | Informations à remplacer dans la description du PCE |

<a name="GRDF+getPCESeuils"></a>

### grdF.getPCESeuils(pce, frequence) ⇒ <code>Promise.&lt;Seuils&gt;</code>
Liste des seuils programmés

**Kind**: instance method of [<code>GRDF</code>](#GRDF)  

| Param | Type | Description |
| --- | --- | --- |
| pce | <code>string</code> | Identifiant du PCE |
| frequence | <code>Frequency</code> | Type de seuil (`Journalier`|`Mensuel`|`Annuel`) |

<a name="GRDF+postPCESeuils"></a>

### grdF.postPCESeuils(pce, seuils) ⇒ <code>Promise.&lt;SeuilsCreated&gt;</code>
Remplacer les seuils

**Kind**: instance method of [<code>GRDF</code>](#GRDF)  

| Param | Type | Description |
| --- | --- | --- |
| pce | <code>string</code> | Identifiant du PCE |
| seuils | <code>Seuils</code> | Seuils à poster |

<a name="GRDF+putPCESeuils"></a>

### grdF.putPCESeuils(pce, seuils) ⇒ <code>Promise.&lt;Seuils&gt;</code>
Modifier un seuil (préciser les identifiants)

**Kind**: instance method of [<code>GRDF</code>](#GRDF)  

| Param | Type | Description |
| --- | --- | --- |
| pce | <code>string</code> | Identifiant du PCE |
| seuils | <code>Seuils</code> | Seuils à muter |

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
Historique de consultation des informations des PCE

**Kind**: instance method of [<code>GRDF</code>](#GRDF)  
<a name="GRDF+putConsultationHistory"></a>

### grdF.putConsultationHistory(data)
Mise à jour de la date de dernière consultation du PCE

**Kind**: instance method of [<code>GRDF</code>](#GRDF)  

| Param | Type |
| --- | --- |
| data | <code>HistoriqueConsultationRequest</code> | 

<a name="GRDF+getUserAccreditation"></a>

### grdF.getUserAccreditation() ⇒ <code>Promise.&lt;Array.&lt;Accreditation&gt;&gt;</code>
Liste des accreditations demandées

**Kind**: instance method of [<code>GRDF</code>](#GRDF)  
<a name="GRDF+putUserAccreditation"></a>

### grdF.putUserAccreditation(pce, partialPCE) ⇒ <code>Promise.&lt;PCE&gt;</code>
Mise à jour de l'accréditation (changement de l'alias par exemple)

**Kind**: instance method of [<code>GRDF</code>](#GRDF)  

| Param | Type | Description |
| --- | --- | --- |
| pce | <code>string</code> | Identifiant du PCE |
| partialPCE |  |  |

<a name="GRDF+getInfoLogements"></a>

### grdF.getInfoLogements() ⇒ <code>Promise.&lt;Array.&lt;InfoLogement&gt;&gt;</code>
Informations sur le logement

**Kind**: instance method of [<code>GRDF</code>](#GRDF)  
<a name="GRDF+getInfoLogementPCE"></a>

### grdF.getInfoLogementPCE() ⇒ <code>Promise.&lt;InfoLogement&gt;</code>
Informations sur le logement d'un PCE

**Kind**: instance method of [<code>GRDF</code>](#GRDF)  
<a name="GRDF.login"></a>

### GRDF.login(email, password) ⇒ <code>Promise.&lt;string&gt;</code>
Obtention d'un jeton d'accès auprès de l'API

Attention: ne JAMAIS transmettre ce jeton à un tier, il vous est strictement personnel !

**Kind**: static method of [<code>GRDF</code>](#GRDF)  
**Returns**: <code>Promise.&lt;string&gt;</code> - Le jeton d'accès  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | Courriel de connexion de l'utilisateur |
| password | <code>string</code> | Mot de passe |

