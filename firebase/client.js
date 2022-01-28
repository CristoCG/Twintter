import firebase from "firebase/app"
require("firebase")

const firebaseConfig = {
  apiKey: "AIzaSyBDFs2z-7iom3BI5ZylcfYQHTqtBEBkk_o",
  authDomain: "twintterv2.firebaseapp.com",
  projectId: "twintterv2",
  storageBucket: "twintterv2.appspot.com",
  messagingSenderId: "477496710266",
  appId: "1:477496710266:web:3fbd0fbf2378bda0ed97c3",
  measurementId: "G-BNYL8RGB2Y",
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

export const addAdrit = ({ avatar, content, img, userId, userName }) => {
  return db.collection("Adrit").add({
    avatar,
    content,
    img,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

export const fetchLatestAdrits = () => {
  return db
    .collection("Adrit")
    .orderBy("createdAt", "desc")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        }
      })
    })
}

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`)
  const task = ref.put(file)
  return task
}
