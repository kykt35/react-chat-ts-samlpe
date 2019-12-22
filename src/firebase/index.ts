import firebase from 'firebase/app';
import { firebaseConfig } from './config';
// import * as firebaseui  from 'firebaseui';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export default firebase;
