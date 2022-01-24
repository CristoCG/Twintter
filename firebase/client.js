import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDzh_UUrs3yvmfpqLw5RMhc48x31VsqtcU",
  authDomain: "twintter-c0e55.firebaseapp.com",
  projectId: "twintter-c0e55",
  storageBucket: "twintter-c0e55.appspot.com",
  messagingSenderId: "131411253494",
  appId: "1:131411253494:web:1eec9f1ce0afd652cbf4d7",
  measurementId: "G-S0TGSPSX86",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const mapUserFromFirebaseAppToUser = (user) => {
  console.log(user);
  const { additionalUserInfo, email} = user;
  const {username,profile} = additionalUserInfo;
 const {avatar_url} = profile

  return {
    avatar: avatar_url,
    username,
    email
  };
};
export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged(user =>{
     const normalizedUser =
    mapUserFromFirebaseAppToUser(user)
    onChange(normalizedUser)
  }
    )
};

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(githubProvider)
    
};
