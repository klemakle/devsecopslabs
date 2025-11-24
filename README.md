# 🔒 DevSecOps Lab - Application Vulnérable et Pipeline de Sécurité

![Security](https://github.com/klemakle/devsecopslabs/workflows/DevSecOps%20Pipeline/badge.svg)
![Node.js](https://img.shields.io/badge/Node.js-22-green)
![Docker](https://img.shields.io/badge/Docker-Alpine-blue)

## 📋 Description

Projet de TP - Module DevSecOps.

Ce repository contient :
- 🔴 **Branche `main`** : Application volontairement vulnérable
- 🟢 **Branche `secure`** : Version corrigée avec bonnes pratiques de sécurité

## 🎯 Objectifs Pédagogiques

1. Détecter les vulnérabilités avec un pipeline CI/CD
2. Comprendre les outils DevSecOps (SAST, SCA, Container Scan, Secret Detection)
3. Corriger les failles de sécurité
4. Implémenter les bonnes pratiques

## 🔍 Pipeline de Sécurité

Le pipeline GitHub Actions effectue 5 types de scans :

| Job | Outil | Description |
|-----|-------|-------------|
| 🏗️ **Build** | Docker | Construction de l'image |
| 🔍 **SAST** | Semgrep | Analyse statique du code source |
| 📦 **SCA** | npm audit | Scan des dépendances vulnérables |
| 🔐 **Secrets** | Gitleaks | Détection de secrets hardcodés |
| 🐳 **Container** | Trivy | Scan de l'image Docker |
| 📊 **Report** | Custom | Rapport JSON + résumé |

## 🚀 Quick Start

### Développement Local

```bash
# Cloner le repository
git clone https://github.com/klemakle/devsecopslabs.git
cd devsecopslabs

# Branche vulnérable (pour analyse)
git checkout main
cd src
npm install
npm start

# Branche sécurisée (bonnes pratiques)
git checkout secure
cd src
npm install
npm start
```

### Docker

```bash
# Build
docker build -t devsecops-app .

# Run avec variables d'environnement
docker run -p 3000:3000 \
  -e JWT_SECRET="your-secret-key-here" \
  devsecops-app
```

## 🛡️ Vulnérabilités (Branche `main`)

### ❌ Code Source
- Secrets hardcodés (clés API, mots de passe)
- Injection SQL potentielle
- Pas de validation des entrées
- Endpoint de debug exposé

### ❌ Dépendances
- `express@4.17.1` - CVE multiples
- `jsonwebtoken@8.5.1` - Vulnérabilités connues

### ❌ Configuration
- Pas de rate limiting
- Pas de headers de sécurité
- Utilisateur root dans le container

## ✅ Corrections (Branche `secure`)

### ✅ Code Source
```javascript
// Variables d'environnement
const SECRET = process.env.JWT_SECRET;

// Validation des entrées
const { body, validationResult } = require('express-validator');

// Headers de sécurité
app.use(helmet());

// Rate limiting
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 5 }));
```

### ✅ Dépendances
```json
{
  "express": "^4.18.2",
  "jsonwebtoken": "^9.0.2",
  "helmet": "^7.1.0",
  "express-rate-limit": "^7.1.0"
}
```

### ✅ Docker
```dockerfile
FROM node:22-alpine  # Image récente et légère
USER nodejs          # Utilisateur non-root
HEALTHCHECK ...      # Monitoring de santé
```

## 📊 Résultats du Pipeline

### Branche `main` (Vulnérable) ❌
```
✗ SAST: FAILURE      (10+ vulnérabilités détectées)
✗ SCA: FAILURE       (Dépendances obsolètes)
✗ Secrets: FAILURE   (Secrets hardcodés détectés)
✗ Container: WARNING (Vulnérabilités dans l'image)
```

### Branche `secure` (Corrigée) ✅
```
✓ SAST: SUCCESS      (0 vulnérabilité)
✓ SCA: SUCCESS       (Dépendances à jour)
✓ Secrets: SUCCESS   (Pas de secrets hardcodés)
✓ Container: SUCCESS (Image sécurisée)
```

## 📚 Ressources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP DevSecOps Guideline](https://owasp.org/www-project-devsecops-guideline/)
- [Semgrep Rules](https://semgrep.dev/r)
- [Trivy Documentation](https://aquasecurity.github.io/trivy/)

## 🎓 Pour les Étudiants

### Exercice 1 : Analyse
1. Clonez la branche `main`
2. Analysez les vulnérabilités détectées par le pipeline
3. Identifiez les failles de sécurité dans le code

### Exercice 2 : Correction
1. Créez une nouvelle branche `fix/<votre-nom>`
2. Corrigez les vulnérabilités une par une
3. Vérifiez que le pipeline passe au vert
4. Créez une Pull Request

### Exercice 3 : Documentation
1. Documentez chaque vulnérabilité trouvée
2. Expliquez comment vous l'avez corrigée
3. Justifiez vos choix techniques

## 🔧 Configuration

### Variables d'Environnement

```bash
# .env (développement local uniquement)
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
PORT=3000
NODE_ENV=development
```

⚠️ **IMPORTANT** : Ne jamais committer le fichier `.env` !

### GitHub Secrets (Production)

```
Settings → Secrets and variables → Actions
```

Ajouter :
- `JWT_SECRET`
- Autres variables sensibles

## 📈 Métriques de Sécurité

Le pipeline génère un rapport JSON téléchargeable :

```json
{
  "timestamp": "2025-11-24T12:00:00Z",
  "results": {
    "sast": { "status": "success", "tool": "Semgrep" },
    "sca": { "status": "success", "tool": "npm audit" },
    "secrets": { "status": "success", "tool": "Gitleaks" },
    "container_scan": { "status": "success", "tool": "Trivy" }
  },
  "summary": {
    "total_checks": 4,
    "passed": 4,
    "failed": 0,
    "overall_status": "PASSED"
  }
}
```


## 📝 License

Projet éducatif - Libre d'utilisation pour l'enseignement

---

**Note** : Ce projet contient **volontairement** des vulnérabilités sur la branche `main` à des fins pédagogiques. Ne jamais déployer cette version !
