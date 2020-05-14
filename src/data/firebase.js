import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAoO8MiixA6N3CMFwsG_zPyRp9tvJmxHQM",
  authDomain: "react-map-demo-d37ee.firebaseapp.com",
  databaseURL: "https://react-map-demo-d37ee.firebaseio.com",
  projectId: "react-map-demo-d37ee",
  storageBucket: "react-map-demo-d37ee.appspot.com",
  messagingSenderId: "823594587201",
  appId: "1:823594587201:web:26eb81188f4b87e1e7e2c0",
  measurementId: "G-106E92JZTS",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
