# Guía de contenido

## Agregar un caso de resultados
Edita `data/casos.js`. Cada caso admite: `cliente`, `vistas`, `alcance`, `leads`, `desc`, `imagen`, `video`.
Los campos vacíos muestran “—” o un texto de ejemplo.

## Imágenes y videos
- Imágenes en `assets/images/` y videos en `assets/videos/`.
- Referéncialos con ruta relativa: `imagen: "assets/images/caso1.jpg"`.
- Recomendado: imágenes < 300 KB (WebP/JPG) y videos .mp4 H.264 < 20 MB.

## Precios y textos
Los planes están en la sección `#planes` de `index.html`.

## WhatsApp e Instagram
Edita `js/config.js` (`WA_NUMBER`, `INSTAGRAM_URL`).
