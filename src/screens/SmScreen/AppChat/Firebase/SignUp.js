import firebase from "./firebaseConfig";

export const SignUpUser = async (email, password) => {

  try {
    return await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
  } catch (error) {
    console.log("error", error);
    return false;
  }
};
