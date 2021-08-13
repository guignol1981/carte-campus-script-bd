import firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyBLndwQkXf9rqkhZ7-xUsLsFLXyEjtzWpY',
    authDomain: 'monportail-test.firebaseapp.com',
    databaseURL: 'https://monportail-test.firebaseio.com',
    projectId: 'monportail-test',
    storageBucket: 'monportail-test.appspot.com',
    messagingSenderId: '126796368333',
    appId: '1:126796368333:web:1c9ed7d646425755d21c84',
    measurementId: 'G-9X57FKCVLQ',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();

firestore
    .collection('places')
    .get()
    .then((qs) => {
        qs.docs.forEach((d) => console.log(d.data()));
    });
