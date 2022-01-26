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

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
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
