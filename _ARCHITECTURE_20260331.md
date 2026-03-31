# _ARCHITECTURE.md
## Dashboard DataViz — Conventions & Composants D3.v3
*Généré depuis session de travail Claude — 31/03/2026*

---

## 1. Contexte & Stack

- **Frontend** : HTML + JS vanilla + D3.v3
- **Backend** : Python (Miniconda) — scripts de fetch / prep données
- **Base de données** : MySQL sur Hostinger (accès distant)
  - host : 77.37.35.25 / port : 3306
  - base de test : u104133027_mysql3
- **Editeur** : Notepad++ (principal) + VS Code (à venir)
- **Versioning** : GitHub — repo `Claude2` (Olivier-Lakoue)
- **D3** : version 3 exclusivement — `d3.v3.min.js` en local

---

## 2. Règle fondamentale — D3.v3 uniquement

Tous les composants sont en **d3.v3**. Les dataviz récupérées en v4/v5/v7 sont systématiquement downgrадées.

### Principales différences v4 → v3

| v4 | v3 |
|---|---|
| `d3.scaleQuantize()` | `d3.scale.quantize()` |
| `d3.linkHorizontal()` | `d3.svg.diagonal().projection()` |
| `d3.hierarchy()` | `d3.layout.tree()` |
| `d3.timeDays()` | `d3.time.days()` |
| `d3.timeWeek.count()` | `d3.time.weekOfYear()` |
| `d3.timeMonths()` | `d3.time.months()` |
| `d3.timeFormat()` | `d3.time.format()` |
| `d3.nest().rollup().object()` | `d3.nest().rollup().map()` |
| `d.data.name` | `d.name` |

---

## 3. Structure des dossiers

```
projet\
├── back_end\
│   └── *.py                        — scripts Python fetch / prep
└── front_end\
    ├── *.html                      — pages à la racine
    ├── *.json                      — données statiques
    └── js\
        ├── _jsLib_D3V3\            — librairie composants D3v3
        │   ├── _attachEvents.js
        │   ├── _D3V3_CollapsibleTree.js
        │   ├── _dataPrep_D3V3_CollapsibleTree.js
        │   └── D3V3_YearlyCalendars.js
        └── *.js                    — scripts dashboard
```

---

## 4. Convention de nommage

| Type | Préfixe | Exemple |
|---|---|---|
| Composant D3v3 | `D3V3_` | `D3V3_CollapsibleTree` |
| Prep données | `_dataPrep_D3V3_` | `_dataPrep_D3V3_CollapsibleTree` |
| Launcher | `_init_` | `_init_D3V3_YearlyCalendars` |
| Helper générique | `_` | `_attachEvents` |
| Lib D3v3 | `_jsLib_D3V3` | dossier de la lib |

---

## 5. Pattern d'un composant — règles invariantes

### 5.1 — 1 seul param en entrée (toujours un objet)

```javascript
function D3V3_MonComposant(params) {
    var div_tgt = params.div_tgt || "div_content1";
    var data    = params.data;
    // ...
}
```

### 5.2 — Séparation fetch / prep / render

```
Launcher _init_     → fetch des données (csv, json, MySQL via back_end)
                    → dataPrep si nécessaire
                    → appel composant avec params.data prêt

Composant D3V3_     → reçoit data déjà prête
                    → render uniquement
                    → ne sait pas d'où viennent les données
```

### 5.3 — Structure HTML cible (div_tgt)

```html
<div id="div_header"></div>
<div id="div_content1"></div>   <!-- zone principale -->
<div id="div_content2"></div>   <!-- zone secondaire -->
<div id="g_footer"></div>
```

### 5.4 — Validation params en entrée

```javascript
if (!div_tgt || !data) {
    console.log('MonComposant : params error !');
    return;
}
```

---

## 6. Helper générique — _attachEvents

Réutilisable dans tous les composants D3. À inclure en tête de chaque fichier composant.

```javascript
function _attachEvents(params) {
    var selection   = params.selection                    ;
    var onMouseOver = params.onMouseOver || function(d) {};
    var onMouseMove = params.onMouseMove || function(d) {};
    var onMouseOut  = params.onMouseOut  || function(d) {};
    var onClick     = params.onClick     || function(d) {};

    if (!selection) {
        console.log('_attachEvents : selection manquante');
        return;
    }

    selection
        .on("mouseover", onMouseOver)
        .on("mousemove", onMouseMove)
        .on("mouseout",  onMouseOut)
        .on("click",     onClick);
}
```

Appel dans le composant :
```javascript
_attachEvents({
    selection   : rect,         // sélection D3 (rect, path, circle...)
    onMouseOver : params.onMouseOver,
    onMouseMove : params.onMouseMove,
    onMouseOut  : params.onMouseOut,
    onClick     : params.onClick
});
```

---

## 7. Composants disponibles

### 7.1 — D3V3_CollapsibleTree

**Fichiers** :
- `_D3V3_CollapsibleTree.js` — composant render
- `_dataPrep_D3V3_CollapsibleTree.js` — prep données

**Params composant** :
```javascript
D3V3_CollapsibleTree({
    div_tgt     : "div_content1",   // div cible
    data        : arbo,             // objet { name, children } prêt
    onMouseOver : function(d) {},
    onMouseOut  : function(d) {},
    onClick     : function(d) {}
});
```

**Params dataPrep** :
```javascript
var arbo = _dataPrep_D3V3_CollapsibleTree(csvLst, fld_dic, f_lst);

// csvLst  : tableau de dicts format plat
// fld_dic : { root_name, key1, key2, key3 (optionnel) }
// f_lst   : ["niv1", "niv2", "niv3"]
```

**Cas d'usage** :
- Secteurs d'activité → Companies (30-40 par secteur)
- Continents → Sous-régions → Pays
- Régions → Départements → Villes

**Validé avec** : `IsoLocDic` — World > Continents > Regions > Countries ✅

---

### 7.2 — D3V3_YearlyCalendars

**Fichier** : `D3V3_YearlyCalendars.js`

**Params composant** :
```javascript
D3V3_YearlyCalendars({
    div_tgt     : "div_content1",
    data        : data,             // { "1990-01-01": 0.023, ... }
    yearRange   : [1990, 2011],     // optionnel
    onMouseOver : function(d) {},
    onMouseOut  : function(d) {},
    onClick     : function(d) {}
});
```

**Params launcher** :
```javascript
_init_D3V3_YearlyCalendars({
    div_tgt  : "div_content1",
    csv_path : "dji.csv",           // à remplacer par fetch back_end
    yearRange: [1990, 2011]
});
```

**dataPrep interne** (dans le launcher) :
```javascript
var data = d3.nest()
    .key(function(d) { return d.Date; })
    .rollup(function(d) { return (d[0].Close - d[0].Open) / d[0].Open; })
    .map(csv);
```

**Validé avec** : `dji.csv` — 1990 à 2011 ✅

---

## 8. Format de données standard

### Format plat (entrée dataPrep)
```javascript
[
    { key1: "valeur_niv1", key2: "valeur_niv2", key3: "valeur_niv3" },
    ...
]
```

### Format arbo (entrée CollapsibleTree)
```javascript
{
    name: "root",
    children: [
        { name: "niv1", children: [
            { name: "niv2", children: [
                { name: "niv3" }         // feuille — pas de children
            ]}
        ]}
    ]
}
```

### Format calendrier (entrée YearlyCalendars)
```javascript
{ "YYYY-MM-DD": valeur_numerique, ... }
```

---

## 9. Méthode de travail GitHub + Claude

### Convention URLs GitHub
```
# URL normale
https://github.com/Olivier-Lakoue/Claude2/blob/main/fichier.js

# URL raw (pour Claude)
https://raw.githubusercontent.com/Olivier-Lakoue/Claude2/refs/heads/main/fichier.js
```

### Ritual de session
1. Donner à Claude les noms des fichiers à traiter
2. Claude construit les URLs raw et lit tout
3. Claude propose les modifications
4. Validation + génération fichier corrigé
5. Test local + push GitHub

### Limite validée
- 2-3 fichiers simultanés — fonctionne bien
- Plus de fichiers — à évaluer

---

## 10. Prochaines étapes

- [ ] Intégrer `_attachEvents` dans `D3V3_CollapsibleTree`
- [ ] Sortir le JS de `d3v3_CollapsibleTree_0b.html` dans `_D3V3_CollapsibleTree.js`
- [ ] Connecter `D3V3_YearlyCalendars` au back_end Python (remplacer `d3.csv`)
- [ ] Connecter `D3V3_CollapsibleTree` aux données MySQL (secteurs + tickers)
- [ ] Plugger les 2 composants dans le dashboard principal
- [ ] Configurer MCP GitHub (quand Anthropic simplifie le setup Windows)
- [ ] Installer VS Code + extension Claude pour confort de travail

---

*À compléter par Olivier — composants custom dashboard (mensuel météo financière, line/bar chart, selecteur de vue)*