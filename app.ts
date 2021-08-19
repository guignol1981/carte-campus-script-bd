import firebase from 'firebase';
import data from './data.json';
import projectConf from './fs_projects_conf.json';


const geoPointRegex = /(-?\d{2}\.\d{1,}),(-?\d{2}\.\d{1,})/;
  
const firebaseApp = firebase.initializeApp(projectConf.monportailTest);
const firestore = firebaseApp.firestore();



Object.keys(data).forEach( collectionId => {			//Traitement des collections
	let collection: any = (data as any)[collectionId];
	Object.keys(collection).forEach( documentId => {	//Traitement des documents
		let doc: any = collection[documentId];
		Object.keys(doc).forEach( key => {				//Traitement des attributs
			 doc[key] = transformType(doc[key]);
		});
		
		//Push le document dans Firestore
		firestore.collection(collectionId).doc(documentId).set(doc,{merge: true});
	});
});



function transformType( attribute : any ){
	if (Array.isArray(attribute)){ //Recursion pour tranformer le contenu des array
		attribute.forEach((arrayElem, arrIndex) => {
			attribute[arrIndex] = transformType(arrayElem);
		});
	}else{ 
		//Transformation des coordonées en GeoPoints
		let match;
		if( match = attribute.match(geoPointRegex) ){
			attribute = new firebase.firestore.GeoPoint(match[1], match[2]);
		}
	}
	return attribute;
}

