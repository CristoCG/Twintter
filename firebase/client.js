import firebase from "firebase"
require("firebase/auth")

const firebaseConfig = {
  apiKey: "AIzaSyDzh_UUrs3yvmfpqLw5RMhc48x31VsqtcU",
  authDomain: "twintter-c0e55.firebaseapp.com",
  projectId: "twintter-c0e55",
  storageBucket: "twintter-c0e55.appspot.com",
  messagingSenderId: "131411253494",
  appId: "1:131411253494:web:1eec9f1ce0afd652cbf4d7",
  measurementId: "G-S0TGSPSX86",
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null

    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}

export const addAdrit = ({ avatar, content, userId, userName }) => {
  return db.collection("Adrits").add({
    avatar,
    content,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

export const fetchLatestAdrits = () => {
  return db
    .collection("Adrits")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data
        const date = new Date(createdAt.seconds * 1000)
        const normalizedCreatedAt = new Intl.DateTimeFormat("es-ES").format(
          date
        )

        return {
          ...data,
          id,
          createdAt: normalizedCreatedAt,
        }
      })
    })
}
