import * as firebase from 'firebase';
require('firebase/firestore');

// Initialize Firebase
const config = {
	apiKey: 'AIzaSyCOv2iXDiDpcPYg-QWdDCIln9Kx6zr5RXY',
	authDomain: 'goals-a9dc5.firebaseapp.com',
	databaseURL: 'https://goals-a9dc5.firebaseio.com',
	projectId: 'goals-a9dc5',
	storageBucket: 'goals-a9dc5.appspot.com',
	messagingSenderId: '554183303492',
};

firebase.initializeApp(config);
const settings = {
	timestampsInSnapshots: true,
};

firebase.firestore().settings(settings);

export const fb = firebase;
export const auth = firebase.auth();
export const db = firebase.firestore();
