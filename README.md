# Santiago Hernandez | Marketing digital para negocios

Landing page estática (HTML + Tailwind CDN + JS vanilla). Sin build ni dependencias.

## Estructura
```
.
├── index.html
├── css/styles.css
├── js/
│   ├── config.js            # WhatsApp e Instagram
│   ├── tailwind-config.js   # colores y tipografía
│   └── main.js              # enlaces, render de casos, animaciones
├── data/casos.js            # tarjetas de resultados
├── assets/{images,videos,icons}/
├── docs/guia-contenido.md
└── .github/workflows/pages.yml
```

## Desarrollo local
Abre `index.html` en el navegador, o usa un servidor local:
```
python3 -m http.server 8000
```

## Configuración inicial
1. `js/config.js`: cambia `WA_NUMBER` e `INSTAGRAM_URL`.
2. `data/casos.js`: completa los casos con datos reales.

## Despliegue en GitHub Pages
1. Sube el proyecto a un repositorio (rama `main`).
2. Settings → Pages → Source: **GitHub Actions**.
3. Cada `git push` a `main` publica el sitio automáticamente.

## Git
```
git init
git add .
git commit -m "Versión inicial"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/NOMBRE-REPO.git
git push -u origin main
```
