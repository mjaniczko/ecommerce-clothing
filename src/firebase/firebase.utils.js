import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBFTu_07HUU1VWYDP9bYXPFcAXVYaueqUo",
  authDomain: "ecommerce-clothing-c4675.firebaseapp.com",
  databaseURL: "https://ecommerce-clothing-c4675.firebaseio.com",
  projectId: "ecommerce-clothing-c4675",
  storageBucket: "ecommerce-clothing-c4675.appspot.com",
  messagingSenderId: "1032502753311",
  appId: "1:1032502753311:web:00b32ac0be7f68104dfd2a",
  measurementId: "G-2XH4DXF5S3"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (err) {
      console.log('error creating user', err.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;