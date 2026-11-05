# Twintter 🕊

Clon de Twitter hecho con [Next.js](https://nextjs.org/), convertido en una
**demo interactiva sin backend**.

Nació en un curso usando Firebase (login con GitHub, Firestore y Storage).
Ahora todo funciona en el navegador: no hace falta crear cuentas ni configurar
nada para probarlo.

## Qué puedes hacer

- Entrar con tu nombre o como uno de los usuarios de ejemplo.
- Ver el timeline con twintts de ejemplo que se actualiza en tiempo real.
- Twintear con texto (máx. 280 caracteres) e imagen (botón o arrastrándola al texto).
- Dar y quitar likes; cada usuario tiene los suyos.
- Ver un twintt en su propia página (`/status/[id]`).
- Ver tu perfil con tus twintts y los likes recibidos, y borrar los tuyos.
- Reiniciar la demo desde el menú ⋯ del perfil.

Para que no se sienta vacía, los usuarios de ejemplo publican de vez en cuando
y le dan like a lo que tú twinteas.

## Cómo funciona sin backend

`lib/demoStore.js` hace el papel que antes hacía Firebase: guarda usuarios,
twintts y likes en `localStorage` y avisa a los componentes con listeners cada
vez que algo cambia (como `onSnapshot`). Las imágenes se reducen con un
`<canvas>` y se guardan como data URL. Los datos de ejemplo están en
`lib/seed.js`.

Como todo vive en el navegador, cada visitante tiene su propia copia de la
demo, y los cambios se sincronizan entre las pestañas abiertas.

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Deploy

Es una app de Next.js normal, así que se despliega en Vercel sin variables de
entorno ni servicios externos.
