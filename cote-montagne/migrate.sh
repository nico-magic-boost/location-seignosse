#!/usr/bin/env bash
# ============================================================
# Migration du template cote-montagne/ vers un repo GitHub dédié.
#
# Usage :
#   ./cote-montagne/migrate.sh git@github.com:<user>/cote-montagne.git
#   ./cote-montagne/migrate.sh https://github.com/<user>/cote-montagne.git
#
# Le script :
#   1. Clone le repo cible (vide) dans /tmp
#   2. Copie tous les fichiers du dossier cote-montagne/ à la racine
#   3. Commit + push sur main
# ============================================================
set -euo pipefail

REMOTE="${1:-}"
if [ -z "$REMOTE" ]; then
  echo "Usage : $0 <git-remote-url>"
  echo "Exemple : $0 git@github.com:nico-magic-boost/cote-montagne.git"
  exit 1
fi

SRC_DIR="$(cd "$(dirname "$0")" && pwd)"
TMP_DIR="$(mktemp -d)"

echo "→ Clone de $REMOTE dans $TMP_DIR"
git clone "$REMOTE" "$TMP_DIR"

echo "→ Copie des fichiers depuis $SRC_DIR"
# rsync -a copie tout (y compris .github, .gitignore) sauf le script lui-même
rsync -a --exclude 'migrate.sh' "$SRC_DIR/" "$TMP_DIR/"

cd "$TMP_DIR"

# Crée la branche main si le repo est vide
git symbolic-ref HEAD refs/heads/main 2>/dev/null || true

git add .
git commit -m "Initial commit — site vitrine Côté Montagne"
git branch -M main
git push -u origin main

echo ""
echo "✅ Repo poussé : $REMOTE"
echo ""
echo "Étapes suivantes :"
echo "  1. GitHub → Settings → Pages : Source = GitHub Actions"
echo "  2. IONOS → DNS : voir README.md pour les enregistrements A + CNAME"
echo "  3. Attendre la propagation DNS, puis cocher 'Enforce HTTPS' sur GitHub"
