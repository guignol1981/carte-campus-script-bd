import firebase from 'firebase';
import data from './data.json';

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

const COLLECTION = 'places';

Object.keys(data.places).forEach((id) => {
    const raw = (data.places as any)[id];
    const place = { ...raw };

    Object.keys(place).forEach((k) => {
        if (place[k] === '') delete place[k];
        if (Array.isArray(place[k])) delete place[k];
    });

    place.markerCoordinates = new firebase.firestore.GeoPoint(
        raw.markerCoordinates.split(',')[0],
        raw.markerCoordinates.split(',')[1]
    );

    if (raw.geometry) {
        place.geometry = raw.geometry.map(
            (g: any) => new firebase.firestore.GeoPoint(g[0], g[1])
        );
    }

    firestore.collection(COLLECTION).doc(id).set(place);
});
