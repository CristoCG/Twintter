// "Backend" de la demo: todo vive en localStorage del navegador.
// Expone una API parecida a la que tenía Firebase (listeners que se
// suscriben y reciben datos nuevos cada vez que algo cambia).

import { BOT_MESSAGES, SEED_TWINTTS, SEED_USERS } from "./seed"

const STORAGE_KEY = "twintter-demo-v1"
const MAX_LENGTH = 280
const USER_COLORS = ["#AB00FF", "#0099FF", "#FF4F8B", "#00B37E", "#FF8A00"]

const listeners = new Set()
const notificationListeners = new Set()
let state = null

const isBrowser = () => typeof window !== "undefined"
const createId = (prefix) =>
  `${prefix}_${Date.now().toString(36)}${Math.random()
    .toString(36)
    .slice(2, 7)}`
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const randomBetween = (min, max) => min + Math.random() * (max - min)

function createSeedState() {
  const now = Date.now()
  const users = {}
  SEED_USERS.forEach((user) => {
    users[user.uid] = { ...user, isSeed: true }
  })

  return {
    users,
    twintts: SEED_TWINTTS.map((t, index) => ({
      id: `seed_${index}`,
      userId: t.userId,
      content: t.content,
      img: null,
      createdAt: now - t.ago,
      likes: [...t.likes],
    })),
    sessionUserId: null,
    botMessageIndex: 0,
  }
}

function getState() {
  if (state) return state
  if (isBrowser()) {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        state = JSON.parse(raw)
        return state
      }
    } catch (e) {
      console.warn("No se pudo leer la demo guardada, se crea una nueva", e)
    }
  }
  state = createSeedState()
  persist()
  return state
}

function persist() {
  if (!isBrowser()) return true
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    return true
  } catch (e) {
    console.warn("No se pudo guardar la demo", e)
    return false
  }
}

function emit() {
  listeners.forEach((listener) => listener())
}

function commit() {
  const saved = persist()
  emit()
  return saved
}

function notify(message) {
  notificationListeners.forEach((listener) => listener(message))
}

// Sincroniza la demo entre pestañas abiertas del mismo navegador.
if (isBrowser()) {
  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY) return
    state = null
    emit()
  })
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

// Se llama al suscribirse (en la siguiente vuelta del event loop, como
// hacía Firebase) y cada vez que cambian los datos.
function listen(select, callback) {
  const run = () => callback(select(getState()))
  const timeout = setTimeout(run, 0)
  const unsubscribe = subscribe(run)
  return () => {
    clearTimeout(timeout)
    unsubscribe()
  }
}

// ---------- Usuarios ----------

const getCurrentUser = (s) =>
  (s.sessionUserId && s.users[s.sessionUserId]) || null

export const onAuthStateChanged = (callback) => listen(getCurrentUser, callback)

export const loginWithName = (name) => {
  const s = getState()
  const username = name.trim().slice(0, 30) || "Invitado"
  const uid = createId("u")
  const handle =
    username
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, "") || "invitado"

  s.users[uid] = {
    uid,
    username,
    handle,
    color: USER_COLORS[Object.keys(s.users).length % USER_COLORS.length],
    bio: "Probando la demo de Twintter 🕊",
  }
  s.sessionUserId = uid
  commit()
}

export const loginAs = (uid) => {
  const s = getState()
  if (!s.users[uid]) return
  s.sessionUserId = uid
  commit()
}

export const logout = () => {
  getState().sessionUserId = null
  commit()
}

export const getDemoUsers = () => SEED_USERS

// ---------- Twintts ----------

const toTwinttView = (s, twintt) => {
  const author = s.users[twintt.userId] || {}
  return {
    ...twintt,
    userName: author.username || "Usuario",
    handle: author.handle,
    avatar: author.avatar || null,
    color: author.color,
    likesCount: twintt.likes.length,
    alreadyLiked: twintt.likes.includes(s.sessionUserId),
    isMine: twintt.userId === s.sessionUserId,
  }
}

const sortedTwintts = (s) =>
  [...s.twintts]
    .sort((a, b) => b.createdAt - a.createdAt)
    .map((t) => toTwinttView(s, t))

export const listenLatestTwintts = (callback) =>
  listen((s) => sortedTwintts(s), callback)

export const listenUserTwintts = (uid, callback) =>
  listen((s) => sortedTwintts(s).filter((t) => t.userId === uid), callback)

export const listenTwintt = (id, callback) =>
  listen((s) => {
    const twintt = s.twintts.find((t) => t.id === id)
    return twintt ? toTwinttView(s, twintt) : null
  }, callback)

export const addTwintt = async ({ content, img = null }) => {
  const s = getState()
  const user = getCurrentUser(s)
  if (!user) throw new Error("Tienes que entrar a la demo para twintear")

  const text = content.trim().slice(0, MAX_LENGTH)
  if (!text && !img) throw new Error("El twintt está vacío")

  // Pequeña espera para que se vea el estado de "publicando".
  await delay(350)

  const twintt = {
    id: createId("t"),
    userId: user.uid,
    content: text,
    img,
    createdAt: Date.now(),
    likes: [],
  }
  s.twintts.push(twintt)

  if (!commit()) {
    s.twintts = s.twintts.filter((t) => t.id !== twintt.id)
    emit()
    throw new Error(
      "Tu navegador no tiene más espacio para la demo. Prueba con una imagen más pequeña o reinicia la demo."
    )
  }

  scheduleBotLikes(twintt.id)
  return twintt
}

export const deleteTwintt = (id) => {
  const s = getState()
  s.twintts = s.twintts.filter(
    (t) => !(t.id === id && t.userId === s.sessionUserId)
  )
  commit()
}

export const toggleLike = (id) => {
  const s = getState()
  const uid = s.sessionUserId
  const twintt = s.twintts.find((t) => t.id === id)
  if (!uid || !twintt) return

  twintt.likes = twintt.likes.includes(uid)
    ? twintt.likes.filter((likeUid) => likeUid !== uid)
    : [...twintt.likes, uid]
  commit()
}

export const MAX_TWINTT_LENGTH = MAX_LENGTH

// ---------- Imágenes ----------

// Lee una imagen y la reduce para que quepa sin problemas en localStorage.
export const readImage = (file, maxSize = 900) =>
  new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) {
      reject(new Error("Ese archivo no es una imagen"))
      return
    }
    const url = URL.createObjectURL(file)
    const image = new Image()
    image.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(image.width, image.height))
      const canvas = document.createElement("canvas")
      canvas.width = Math.round(image.width * scale)
      canvas.height = Math.round(image.height * scale)
      const context = canvas.getContext("2d")
      // Fondo blanco para que los PNG transparentes no queden negros en JPEG.
      context.fillStyle = "#fff"
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(url)
      resolve(canvas.toDataURL("image/jpeg", 0.82))
    }
    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error("No se pudo leer la imagen"))
    }
    image.src = url
  })

// ---------- Actividad simulada ----------

export const onNotification = (callback) => {
  notificationListeners.add(callback)
  return () => notificationListeners.delete(callback)
}

const botIds = () => SEED_USERS.map((u) => u.uid)

function scheduleBotLikes(twinttId) {
  const likers = botIds()
    .sort(() => Math.random() - 0.5)
    .slice(0, 1 + Math.floor(Math.random() * 3))

  likers.forEach((uid, index) => {
    setTimeout(() => {
      const s = getState()
      const twintt = s.twintts.find((t) => t.id === twinttId)
      if (!twintt || twintt.likes.includes(uid) || uid === twintt.userId) return
      twintt.likes.push(uid)
      commit()
      if (twintt.userId === s.sessionUserId) {
        notify(`A ${s.users[uid].username} le gustó tu twintt 💜`)
      }
    }, randomBetween(2500, 5000) + index * randomBetween(2000, 4000))
  })
}

function publishBotTwintt() {
  const s = getState()
  const candidates = BOT_MESSAGES.filter((m) => m.userId !== s.sessionUserId)
  if (s.botMessageIndex >= BOT_MESSAGES.length || !candidates.length) {
    return false
  }
  const message = BOT_MESSAGES[s.botMessageIndex]
  s.botMessageIndex += 1
  if (message.userId === s.sessionUserId) return true

  s.twintts.push({
    id: createId("t"),
    userId: message.userId,
    content: message.content,
    img: null,
    createdAt: Date.now(),
    likes: [],
  })
  commit()
  notify(`${s.users[message.userId].username} acaba de twintear`)
  return true
}

// Los usuarios de ejemplo publican cada cierto tiempo mientras la demo
// está abierta. Devuelve una función para detenerlo.
export const startBotActivity = () => {
  let timeout
  const tick = () => {
    timeout = setTimeout(() => {
      if (publishBotTwintt()) tick()
    }, randomBetween(25000, 45000))
  }
  tick()
  return () => clearTimeout(timeout)
}

export const resetDemo = () => {
  state = createSeedState()
  commit()
}
