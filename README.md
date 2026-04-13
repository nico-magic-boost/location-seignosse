# location-seignosse.fr — Uaïna House

Site vitrine statique pour la location de vacances **Uaïna House** à Seignosse (Landes, 40510).

## Structure

```
.
├── index.html                    # Page unique
├── assets/
│   ├── css/style.css             # Styles
│   └── js/main.js                # JS (année footer)
├── CNAME                         # Domaine personnalisé GitHub Pages
├── .github/workflows/deploy.yml  # Déploiement auto sur GitHub Pages
├── robots.txt
├── sitemap.xml
└── README.md
```

Le site est **100 % statique** : pas de build, pas de dépendances.

## Aperçu local

Ouvre simplement `index.html` dans un navigateur, ou lance un petit serveur :

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

## Déploiement — GitHub Pages + domaine IONOS

Le site est publié sur **https://location-seignosse.fr** via GitHub Pages.
Chaque `git push` sur `main` déclenche un déploiement automatique
(workflow `.github/workflows/deploy.yml`).

### Mise en place initiale (à faire une seule fois)

#### 1. Activer GitHub Pages sur le repo

GitHub → Settings → Pages :
- **Source** : `GitHub Actions`
- (Le fichier `CNAME` du repo déclare le domaine `location-seignosse.fr`.)

#### 2. Configurer le DNS chez IONOS

IONOS → Domaines & SSL → `location-seignosse.fr` → **DNS** :

**Apex (`@`) — 4 enregistrements A** (IPs officielles GitHub Pages) :

| Type | Hôte | Valeur             | TTL  |
|------|------|--------------------|------|
| A    | @    | 185.199.108.153    | 3600 |
| A    | @    | 185.199.109.153    | 3600 |
| A    | @    | 185.199.110.153    | 3600 |
| A    | @    | 185.199.111.153    | 3600 |

**Sous-domaine `www` — 1 CNAME** (remplace `<user>` par le propriétaire du repo) :

| Type  | Hôte | Valeur              | TTL  |
|-------|------|---------------------|------|
| CNAME | www  | `<user>.github.io.` | 3600 |

> ⚠️ **Supprime** tout enregistrement A/AAAA/CNAME existant pour `@` et `www`
> qui pointerait vers l'hébergement IONOS précédent — sinon conflit.

#### 3. Vérifier le domaine côté GitHub

Une fois le DNS propagé (quelques minutes à quelques heures — tu peux vérifier
avec `dig location-seignosse.fr +short`) :

1. GitHub → Settings → Pages : le champ **Custom domain** doit afficher
   `location-seignosse.fr` avec une coche verte (détecté depuis `CNAME`).
2. Coche **Enforce HTTPS** dès que la case devient disponible (GitHub Pages
   provisionne automatiquement un certificat Let's Encrypt — ça peut prendre
   jusqu'à 24h après la config DNS).

### Déployer une nouvelle version

```bash
git push origin main
```

Le workflow GitHub Actions s'occupe du reste. Tu peux suivre le déploiement
dans l'onglet **Actions** du repo.

## À compléter

- Ajouter les **photos** de la maison dans `assets/img/` et les intégrer
  (hero + galerie).
- Vérifier les **coordonnées exactes** sur la carte (actuellement centrée sur
  Seignosse bourg).
- Ajouter un **favicon** (`favicon.ico` à la racine).
- Remplacer l'e-mail de contact dans `index.html` si nécessaire.

## Licence

Contenu propriétaire — Uaïna House, Seignosse.
