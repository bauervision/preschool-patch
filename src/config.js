import firebase from "firebase";

const preschoolPatch = {
  apiKey: "AIzaSyBdBdI8yyFc4Pb9TEZyFLGYyEi0sDzpWyE",
  authDomain: "preschoolpatch-f04be.firebaseapp.com",
  databaseURL: "https://preschoolpatch-f04be.firebaseio.com",
  projectId: "preschoolpatch-f04be",
  storageBucket: "preschoolpatch-f04be.appspot.com",
  messagingSenderId: "149278987558",
  appId: "1:149278987558:web:a5656ec12b3ac3aa8edde7"
};
// Initialize Firebase
firebase.initializeApp(preschoolPatch);

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
