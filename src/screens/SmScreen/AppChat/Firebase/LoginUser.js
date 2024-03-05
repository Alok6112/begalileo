import firebase from './firebaseConfig';

export const LoginUser = async (email, password) => {
    try {
        return await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
        return error;
    }
}