
import * as firebase from 'firebase';


// Initialize Firebase
const config = {
  apiKey: "AIzaSyD4tEDnpV5rfnsZcTgj20CHpUCtSu9Xovk",
  authDomain: "cryp-2b7e6.firebaseapp.com",
  databaseURL: "https://cryp-2b7e6.firebaseio.com",
  projectId: "cryp-2b7e6",
  storageBucket: "cryp-2b7e6.appspot.com",
  messagingSenderId: "797823239346"
};

export const firebaseApp = firebase.initializeApp(config);
export const coinRef = firebase.database().ref('coins');
