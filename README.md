# location-seignosse.fr — Uaïna House

Site vitrine statique pour la location de vacances **Uaïna House** à Seignosse (Landes, 40510).

## Structure

```
.
├── index.html           # Page unique
├── assets/
│   ├── css/style.css    # Styles
│   └── js/main.js       # JS (année footer)
├── .htaccess            # HTTPS + cache + sécurité (Apache / IONOS)
├── robots.txt
├── sitemap.xml
└── README.md
```

Le site est **100 % statique** : pas de build, pas de dépendances. Il se publie
tel quel sur n'importe quel hébergement web classique (IONOS, OVH, Netlify,
Cloudflare Pages, GitHub Pages…).

## Aperçu local

Ouvre simplement `index.html` dans un navigateur, ou lance un petit serveur :

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

## Déploiement sur IONOS (domaine location-seignosse.fr)

Objectif : publier le site sur **https://location-seignosse.fr** (pas un
sous-domaine).

### Option A — Hébergement IONOS (le plus simple)

Si tu as déjà un pack d'hébergement IONOS associé au domaine :

1. **IONOS → Hébergement → Webspace** : récupère tes identifiants **SFTP**
   (hôte, login, mot de passe).
2. Ouvre FileZilla (ou Cyberduck). Connexion :
   - **Hôte** : `access-5xxxxxxx.webspace-host.com` (fourni par IONOS)
   - **Port** : `22` (SFTP)
   - **Utilisateur / mot de passe** : ceux de la console.
3. Dans le webspace, va dans le dossier racine du domaine
   (`location-seignosse.fr/` ou `/` selon ton pack).
4. **Upload** tout le contenu de ce repo (`index.html`, `assets/`,
   `.htaccess`, `robots.txt`, `sitemap.xml`).
5. IONOS → Domaines & SSL → `location-seignosse.fr` :
   - Vérifie que le domaine pointe bien vers ce webspace.
   - Active le **certificat SSL gratuit (Let's Encrypt)**.
6. Ouvre https://location-seignosse.fr dans un navigateur — c'est en ligne.

### Option B — Le domaine IONOS pointe ailleurs (GitHub Pages / Netlify / Cloudflare Pages)

Si tu n'as pas d'hébergement IONOS et que tu veux utiliser un hébergeur
statique gratuit, il faut modifier la **zone DNS** du domaine sur IONOS.

#### B.1 — GitHub Pages

1. Sur GitHub, dans ce repo : **Settings → Pages** → source `main` (ou la
   branche déployée) → dossier `/` → Save.
2. Dans le repo, ajoute un fichier `CNAME` contenant uniquement :
   ```
   location-seignosse.fr
   ```
3. Sur IONOS → Domaines → `location-seignosse.fr` → **DNS** :
   - Enregistrements **A** pour `@` :
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Enregistrement **CNAME** pour `www` :
     ```
     <ton-user>.github.io.
     ```
4. Sur GitHub Pages, coche **Enforce HTTPS** une fois le DNS propagé.

#### B.2 — Netlify / Cloudflare Pages / Vercel

1. Connecte le repo sur la plateforme choisie, elle déploie automatiquement.
2. Ajoute le **custom domain** `location-seignosse.fr`.
3. Sur IONOS → DNS, crée les enregistrements demandés par la plateforme
   (en général un **CNAME** pour `www` + un **A/ALIAS** pour `@`).
4. SSL : automatique côté Netlify / Cloudflare / Vercel.

### Redirection www → non-www

Le site est publié en **https://location-seignosse.fr** (sans `www`).
Le fichier `.htaccess` gère la redirection côté Apache (Option A).
Pour les options B, configure la redirection dans l'interface de l'hébergeur
(Netlify : `_redirects`, Cloudflare : Page Rules, GitHub Pages : géré
automatiquement si `CNAME` est correct).

## À compléter

- Ajouter les **photos** de la maison dans `assets/img/` et les intégrer
  (hero + galerie).
- Vérifier les **coordonnées exactes** sur la carte (actuellement centrée sur
  Seignosse bourg).
- Ajouter un **favicon** (`favicon.ico` à la racine).
- Remplacer l'e-mail de contact dans `index.html` si nécessaire.

## Licence

Contenu propriétaire — Uaïna House, Seignosse.
