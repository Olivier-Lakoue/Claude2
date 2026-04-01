# _ARCHITECTURE.md
## Dashboard DataViz — Conventions & Composants D3.v3
*Généré depuis session de travail Claude — 31/03/2026*
*Mis à jour — 31/03/2026 (soirée) — ajout D3Class_YearMonthCalendars*

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
│   └── *.py                          — scripts Python fetch / prep
└── front_end\
    ├── *.html                        — pages à la racine
    ├── *.json                        — données statiques
    └── js\
        ├── _jsLib_D3V3\              — librairie composants D3v3
        │   ├── _attachEvents.js
        │   ├── _D3V3_CollapsibleTree.js
        │   ├── _dataPrep_D3V3_CollapsibleTree.js
        │   ├── D3V3_YearlyCalendars.js
        │   └── D3Class_YearMonthCalendars.js
        └── *.js                      — scripts dashboard
```

---

## 4. Convention de nommage

| Type | Préfixe | Exemple |
|---|---|---|
| Composant D3v3 | `D3V3_` | `D3V3_CollapsibleTree` |
| Classe D3v3 | `D3Class_` | `D3Class_YearMonthCalendars` |
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
<div id="div_content1"></div>
<div id="div_content2"></div>
<div id="g_footer"></div>
```

### 5.4 — Validation params en entrée

```javascript
if (!div_tgt || !data) {
    console.log('MonComposant : params error !');
    return;
}
```

### 5.5 — Pattern classe — règles invariantes

```javascript
var cal = new D3Class_MonComposant(params) ;
cal.setData({ data:myData }) ;   // chainable
cal.render({ mode:"..." }) ;     // chainable

// ou en chainage
new D3Class_MonComposant({ div_tgt:"div_content1" })
    .setData({ data:myData })
    .render({ mode:"year" }) ;
```

**Règles classe :**
- Tout public — pas de méthodes/propriétés cachées
- 1 seul param objet en entrée partout
- `setData()` et `render()` retournent `this` — chainables
- `div_tgt` fixé au constructor, surchargeable dans chaque render via `params.div_tgt`
- Clear du div géré par la fonction appelante — pas par la classe

---

## 6. Helper générique — _attachEvents

```javascript
function _attachEvents(params) {
    var selection   = params.selection                    ;
    var onMouseOver = params.onMouseOver || function(d) {};
    var onMouseMove = params.onMouseMove || function(d) {};
    var onMouseOut  = params.onMouseOut  || function(d) {};
    var onClick     = params.onClick     || function(d) {};
    if (!selection) { console.log('_attachEvents : selection manquante'); return; }
    selection
        .on("mouseover", onMouseOver)
        .on("mousemove", onMouseMove)
        .on("mouseout",  onMouseOut)
        .on("click",     onClick);
}
```

---

## 7. Composants disponibles

### 7.1 — D3V3_CollapsibleTree

**Fichiers** : `_D3V3_CollapsibleTree.js` + `_dataPrep_D3V3_CollapsibleTree.js`

```javascript
D3V3_CollapsibleTree({ div_tgt, data, onMouseOver, onMouseOut, onClick });

var arbo = _dataPrep_D3V3_CollapsibleTree(csvLst, fld_dic, f_lst);
// fld_dic : { root_name, key1, key2, key3 (optionnel) }
// f_lst   : ["niv1", "niv2", "niv3"]
```

**Validé avec** : `IsoLocDic` — World > Continents > Regions > Countries ✅

---

### 7.2 — D3V3_YearlyCalendars

**Fichier** : `D3V3_YearlyCalendars.js`

```javascript
D3V3_YearlyCalendars({ div_tgt, data, yearRange, onMouseOver, onMouseOut, onClick });

_init_D3V3_YearlyCalendars({ div_tgt, csv_path, yearRange });
```

**Validé avec** : `dji.csv` — 1990 à 2011 ✅

---

### 7.3 — D3Class_YearMonthCalendars

**Fichier** : `D3Class_YearMonthCalendars.js`

**Basée sur** : `_D3v3_render1MonthCal_1b` — moteur 100% réutilisé

**Modes** : `"line"` | `"block"` | `"column"` | `"year"`

**Constructor** :
```javascript
new D3Class_YearMonthCalendars({
    div_tgt      : "div_content1",
    data         : {},              // optionnel — via setData()
    cal_dic      : {},
    color_mode   : "delta",         // "delta" | "binaire" | "tricolor" | "quartile"
    value_format : "raw",           // "raw" | "pct" | "int"
    colors       : ["#e53935","#ffeb3b","#ffeb3b","#4caf50"],
    threshold    : 0,
    show_day     : true,
    line2_mode   : "arrow",         // "arrow" | "pct" | "value" | "none"
    onMonthClick : function(p) {},  // { year, month, data, div_foot }
    border_color : null,
    color_binaire  : { seuil:0, clr_under:"#e53935", clr_above:"#4caf50" },
    color_tricolor : { seuil_low:-0.005, seuil_high:0.005, clr_under, clr_neutral, clr_above }
})
```

**Format data** :
```javascript
{ "2025-11-03": 2.97, "2025-11-04": -1.23, ... }  // YYYY-MM-DD → number
```

**Méthodes publiques** :
```javascript
setData(params)              // update data/cal_dic — chainable
computeMonth(year, month)    // → { data_month, avg_month, border_color, YearMonth }
getClr(d, ctx)               // couleur cellule selon color_mode
getPrev(date_str, ctx)       // valeur J-1 (remonte max 7 jours)
fmtVal(v)                    // formate selon value_format
cellSize(mode)               // → { cs, cs_w, cs_h, width, height, col_w, cs_col_h, ... }
createSvg(params)            // → { svg, div_id, div_foot }
animateRects(rect)           // opacity 0→1 progressif
attachEvents(rect, ctx)      // events actuels — nouveau mécanisme à injecter
render_month(params)         // render 1 mois — line|block|column
render_year(params)          // boucle années→mois — bornes auto depuis data
render(params)               // point d'entrée unique — dispatch selon mode
```

**Workflows** :
```javascript
// workflow 1 — tout d'un coup
var cal = new D3Class_YearMonthCalendars({ div_tgt:"div_content1", data:myData }) ;
cal.render({ mode:"block", year:2025, month:3 }) ;

// workflow 2 — init tôt, data tard
var cal = new D3Class_YearMonthCalendars({ div_tgt:"div_content1" }) ;
cal.setData({ data:myData }) ;
cal.render({ mode:"line", year:2026, month:1 }) ;

// workflow 3 — mode year — bornes calculées automatiquement depuis data
cal.render({ mode:"year", month_mode:"block" }) ;

// workflow 4 — changement ticker sans recréer l'instance
document.getElementById("div_content1").innerHTML = "" ;  // clear géré par appelant
cal.setData({ data:newData }) ;
cal.render({ mode:"year" }) ;

// workflow 5 — chainage
new D3Class_YearMonthCalendars({ div_tgt:"div_content1" })
    .setData({ data:myData })
    .render({ mode:"year" }) ;
```

**Dépendances externes** :
- `_D3_checkVersion()` — vérifie d3.v3
- `_Html_render1MonthCal_1b()` — fallback HTML
- `_pad()` — padding mois 2 chiffres
- `Makeid()` — id unique
- `month_names0` — tableau noms mois (global)
- `_odl_cal_registry` — registry global instances

**Statut** : code généré ✅ — test en cours

---

## 8. Format de données standard

### Format plat
```javascript
[{ key1:"valeur_niv1", key2:"valeur_niv2", key3:"valeur_niv3" }, ...]
```

### Format arbo (CollapsibleTree)
```javascript
{ name:"root", children:[{ name:"niv1", children:[{ name:"niv2", children:[{ name:"niv3" }] }] }] }
```

### Format calendrier (YearlyCalendars + D3Class_YearMonthCalendars)
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
1. Lire `_ARCHITECTURE.md` raw — contexte immédiat
2. Donner à Claude les noms des fichiers à traiter
3. Claude construit les URLs raw et lit tout
4. Claude propose les modifications
5. Validation + génération fichier corrigé
6. Test local + push GitHub

### Limite validée
- 2-3 fichiers simultanés — fonctionne bien
- Plus de fichiers — à évaluer

---

## 10. Prochaines étapes

- [ ] Tester `D3Class_YearMonthCalendars` avec données réelles dashboard
- [ ] Injecter nouveau mécanisme `_attachEvents` dans `D3Class_YearMonthCalendars`
- [ ] Intégrer `_attachEvents` dans `D3V3_CollapsibleTree`
- [ ] Sortir le JS de `d3v3_CollapsibleTree_0b.html` dans `_D3V3_CollapsibleTree.js`
- [ ] Connecter `D3V3_YearlyCalendars` au back_end Python (remplacer `d3.csv`)
- [ ] Connecter `D3V3_CollapsibleTree` aux données MySQL (secteurs + tickers)
- [ ] Plugger les composants dans le dashboard principal
- [ ] Configurer MCP GitHub (quand Anthropic simplifie le setup Windows)
- [ ] Installer VS Code + extension Claude

---

*À compléter par Olivier — composants custom dashboard (mensuel météo financière, line/bar chart, selecteur de vue)*
