# ÑAPA · Presentación interactiva ante el jurado
Presentación 16:9 (HTML/CSS/JS) con control remoto desde el celular por QR + WebSocket. **Sin dependencias: solo Node.js ≥ 16** (no hay `npm install`).

## Ejecutar
1. Conecta el computador y el celular a la **misma red Wi-Fi**.
2. En esta carpeta: `node server.js` (o `npm start`).
3. Abre `http://localhost:3000` en el computador y pulsa **F** para pantalla completa.
4. Pulsa **Q** (o el botón «Celular»): aparece un QR. Escanéalo con el celular → abre el control remoto.
5. Si no ves la conexión: permite Node.js en el firewall (Windows: «Permitir acceso» a redes privadas) y evita redes con «aislamiento de clientes» (Wi-Fi de universidad/hotel). Alternativa fiable: activar punto de acceso del celular y conectar el computador a él.
Variables: `PORT=3000`, `TOKEN=abc123` (el token del QR cambia en cada arranque; sin token el celular no se conecta).

## Controles
→ / Espacio / Re Pág: siguiente · ← / Av Pág: anterior · Inicio / Fin · F pantalla completa · Q QR · clic en la barra inferior para saltar · flechas laterales.
Sin servidor (doble clic en index.html) la presentación funciona, pero sin control remoto.

## Estructura
`server.js` (HTTP + WebSocket RFC 6455 propio) · `public/index.html` · `public/remote.html` (celular) · `public/css/style.css` · `public/js/{data,slides,app,qr}.js` · `public/fonts/` (opcional).
- `data.js`: cifras del Excel definitivo. `slides.js`: contenido y composición de cada diapositiva. `qr.js`: generador de QR propio (probado: decodifica correctamente).
- Fuentes de marca: copia `Funtastic.woff2` y `DMSans.woff2` a `public/fonts/`. Sin ellas se usa Arial Black/Impact.

## Orden de la sesión (guía del jurado)
Primero se proyecta el **video sketch**; luego esta presentación: 2–3 Problema · 4 Cliente/usuario · 5–6 Solución y demo · 7 Validación (integrada) · 8–14 Mercado, precio, modelo y finanzas · 15 Recomendaciones · 16 Preguntas.

## Datos a validar (inconsistencias entre archivos)
- **Precio:** el Excel definitivo dice **$50.000/mes**; el Manual aún dice $45.000 → se usó $50.000.
- **Costo por app:** Excel $25.272 (Manual: $25.945,48) y **proyección:** Excel 200 suscripciones/$10.000.000 en 12 meses (Manual: 44 apps/$1.980.000 en 6 meses) → se usó el Excel.
- Excel, hoja Resumen: «utilidad acumulada ≥ 0 desde» y «meses sin equilibrio» muestran `#REF!`; no se usaron.
- El Excel no calcula impuesto de renta ni «margen operacional» por separado: se presenta la utilidad neta (37,5 %) como tal. Margen bruto 74,7 % = utilidad bruta / ingresos.
- Margen de contribución $22.736 = «lo que aporta cada app» del Excel (descuenta comisión/GMF, depreciación y reserva).
- Envío automático por WhatsApp: el Manual lo marca «no comprobado».
- Cifra de negocios en Santa Marta (≈2.838): estimación; la Cámara de Comercio solo reporta 290 registrados.
