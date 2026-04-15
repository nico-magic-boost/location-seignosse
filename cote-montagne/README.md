# cote-montagne.fr — Côté Montagne

Site vitrine statique pour **Côté Montagne**, boutique de décoration à
Saint-Lary-Soulan (Hautes-Pyrénées, 65170).

## Structure

```
.
├── index.html                    # Page d'accueil
├── a-propos/index.html           # À propos / l'histoire de Charlène
├── contact/index.html            # Adresse, horaires, contact
├── assets/
│   ├── css/style.css             # Styles (palette bois / lin / terracotta)
│   ├── js/main.js                # JS (année footer)
│   └── img/favicon.svg           # Favicon placeholder
├── CNAME                         # Domaine personnalisé GitHub Pages
├── .github/workflows/deploy.yml  # Déploiement auto sur GitHub Pages
├── robots.txt
├── sitemap.xml
└── README.md
```

Site **100 % statique** : pas de build, pas de dépendances.

## Aperçu local

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

## Déploiement — GitHub Pages + domaine IONOS

Le site est publié sur **https://cote-montagne.fr** via GitHub Pages. Chaque
`git push` sur `main` déclenche un déploiement automatique (workflow
`.github/workflows/deploy.yml`).

### Mise en place initiale (à faire une seule fois)

#### 1. Créer le repo GitHub

1. Sur GitHub, créer un nouveau repo `cote-montagne` (public ou privé).
2. Copier le contenu de ce dossier (`cote-montagne/`) à la racine du nouveau repo.
3. `git init`, commit, push sur `main`.

#### 2. Activer GitHub Pages

GitHub → Settings → Pages :
- **Source** : `GitHub Actions`
- (Le fichier `CNAME` déclare le domaine `cote-montagne.fr`.)

#### 3. Configurer le DNS chez IONOS

IONOS → Domaines & SSL → `cote-montagne.fr` → **DNS** :

**Apex (`@`) — 4 enregistrements A** (IPs officielles GitHub Pages) :

| Type | Hôte | Valeur             | TTL  |
|------|------|--------------------|------|
| A    | @    | 185.199.108.153    | 3600 |
| A    | @    | 185.199.109.153    | 3600 |
| A    | @    | 185.199.110.153    | 3600 |
| A    | @    | 185.199.111.153    | 3600 |

**Sous-domaine `www` — 1 CNAME** (remplacer `<user>` par le propriétaire du repo) :

| Type  | Hôte | Valeur              | TTL  |
|-------|------|---------------------|------|
| CNAME | www  | `<user>.github.io.` | 3600 |

> ⚠️ Supprimer tout enregistrement A/AAAA/CNAME existant pour `@` et `www`
> qui pointerait vers un hébergement précédent.

#### 4. Vérifier le domaine côté GitHub

Une fois le DNS propagé (`dig cote-montagne.fr +short`) :

1. GitHub → Settings → Pages : le champ **Custom domain** doit afficher
   `cote-montagne.fr` avec une coche verte.
2. Cocher **Enforce HTTPS** dès que la case devient disponible.

## À compléter avant mise en ligne

- **Adresse exacte** de la boutique à Saint-Lary-Soulan
  (`contact/index.html`).
- **Horaires** réels d'ouverture (`contact/index.html`).
- **Téléphone** (`contact/index.html`).
- **Photos** de la boutique + pièces phares dans `assets/img/`
  (hero, `og-cover.jpg` 1200×630).
- **Logo** Côté Montagne (remplacer `favicon.svg`).
- **E-mail de contact** : créer `contact@cote-montagne.fr` chez IONOS
  (ou adapter l'adresse dans les pages).
- Ajouter Google Analytics / bandeau cookies si souhaité (voir le site
  `location-seignosse.fr` pour la référence du Consent Mode v2).

## Licence

Contenu propriétaire — Côté Montagne, Saint-Lary-Soulan.
