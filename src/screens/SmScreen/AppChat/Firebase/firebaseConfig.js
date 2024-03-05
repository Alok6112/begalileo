import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAAMKt_7W5x1dU9ErP3tkhOqkYZXpjlYhU',
  databaseURL: 'https://begalileo-236510.firebaseio.com/',
  projectId: 'begalileo-236510',
  appId: '1:47377262630:ios:4e2ce595c2c4871eeadee7',
};

console.log('firebase', firebase);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
