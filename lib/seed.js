// Datos de ejemplo con los que arranca la demo.

export const SEED_USERS = [
  {
    uid: "u_lucia",
    username: "Lucía Rojas",
    handle: "lucia.dev",
    color: "#AB00FF",
    bio: "Frontend en las mañanas, café el resto del día ☕",
  },
  {
    uid: "u_mateo",
    username: "Mateo Vargas",
    handle: "mateo_backend",
    color: "#0099FF",
    bio: "Si funciona en mi máquina, ya es un buen comienzo.",
  },
  {
    uid: "u_sofia",
    username: "Sofía Medina",
    handle: "sofi.codes",
    color: "#FF4F8B",
    bio: "Diseño + código. CSS no es magia, es paciencia.",
  },
  {
    uid: "u_bot",
    username: "Twintter Bot",
    handle: "twintterbot",
    color: "#1C5480",
    bio: "Te cuento cómo funciona esta demo 🕊",
  },
]

const MIN = 60 * 1000
const HOUR = 60 * MIN

// `ago` es cuánto tiempo antes de crear la demo se "publicó" cada twintt.
export const SEED_TWINTTS = [
  {
    userId: "u_bot",
    ago: 2 * MIN,
    content:
      "¡Bienvenido a Twintter! 🕊 Esta es una demo sin servidor: todo lo que publiques, tus likes y tu perfil se guardan solo en tu navegador. Prueba a twintear algo 👇",
    likes: ["u_lucia", "u_mateo", "u_sofia"],
  },
  {
    userId: "u_lucia",
    ago: 18 * MIN,
    content:
      "Hoy aprendí que `structuredClone` existe y llevo años haciendo JSON.parse(JSON.stringify(obj)) 🫠",
    likes: ["u_mateo", "u_sofia"],
  },
  {
    userId: "u_mateo",
    ago: 47 * MIN,
    content:
      "Mi commit más honesto del día: «arreglado el arreglo que arreglaba el bug».",
    likes: ["u_lucia"],
  },
  {
    userId: "u_sofia",
    ago: 2 * HOUR,
    content:
      "Recordatorio amable: `display: grid; place-items: center;` y listo. Centrar un div ya no es un meme 💜",
    likes: ["u_lucia", "u_mateo", "u_bot"],
  },
  {
    userId: "u_mateo",
    ago: 5 * HOUR,
    content:
      "¿Tabs o espacios? Respuesta correcta: lo que diga el Prettier del proyecto y no se discute más.",
    likes: ["u_sofia"],
  },
  {
    userId: "u_lucia",
    ago: 9 * HOUR,
    content:
      "Pasé de Firebase a localStorage para la demo de mi proyecto y ahora carga más rápido que mi motivación los lunes.",
    likes: ["u_bot"],
  },
  {
    userId: "u_sofia",
    ago: 26 * HOUR,
    content:
      "Tip: arrastra una imagen al cuadro de texto cuando escribas un twintt. Sí, funciona aunque no haya backend 😉",
    likes: ["u_lucia", "u_mateo"],
  },
  {
    userId: "u_bot",
    ago: 30 * HOUR,
    content:
      "¿Quieres empezar de cero? En tu perfil, pulsa el botón ⋯ y elige «Reiniciar demo».",
    likes: [],
  },
]

// Mensajes que los usuarios de ejemplo publican mientras navegas la demo.
export const BOT_MESSAGES = [
  {
    userId: "u_mateo",
    content: "Acabo de borrar node_modules y siento paz interior.",
  },
  {
    userId: "u_lucia",
    content:
      "console.log('aquí') sigue siendo mi debugger favorito y no me arrepiento.",
  },
  {
    userId: "u_sofia",
    content:
      "Nueva paleta para el proyecto: morado, más morado y un toque de morado 💜",
  },
  {
    userId: "u_mateo",
    content: "Hoy el deploy salió verde a la primera. Voy a comprar lotería.",
  },
  {
    userId: "u_lucia",
    content:
      "Escribir tests no es perder tiempo, es ahorrárselo a tu yo del futuro.",
  },
  {
    userId: "u_sofia",
    content:
      "Si tu botón no tiene estado :focus, no está terminado. Accesibilidad primero ✨",
  },
  {
    userId: "u_mateo",
    content:
      "Leer la documentación antes de preguntar: el superpoder más subestimado.",
  },
  {
    userId: "u_lucia",
    content:
      "Refactoricé 200 líneas en 40. Me siento invencible (hasta que corra los tests).",
  },
]
