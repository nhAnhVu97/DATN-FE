import firebase from 'firebase/app';
import 'firebase/storage'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDOb57tI0tLMZrR0i9sHybsURSywycWCuA",
    authDomain: "image-upload-c6145.firebaseapp.com",
    databaseURL: "https://image-upload-c6145.firebaseio.com",
    projectId: "image-upload-c6145",
    storageBucket: "image-upload-c6145.appspot.com",
    messagingSenderId: "1071105187296"
};


firebase.initializeApp(config);
const storage = firebase.storage();

export { storage }