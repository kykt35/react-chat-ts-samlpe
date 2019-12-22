import firebase from 'firebase/app';
import { firebaseConfig } from './config.js';

import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export default firebase;
