import firebase from "./firebaseConfig";
import "firebase/compat/database";
export const AddUser = async (name, email, image, UserId, parent_id) => {
  await firebase
    .database()
    .ref("users/" + UserId)
    .set({
      name: name,
      email: email,
      image: image,
      UserId: UserId,
      parent_id:parent_id
    });
};
export const SavingFcmToken = async (fcmToken, UserId,firstName,lastName) => {
   
  await firebase
    .database()
    .ref("fcmTokens/" + UserId)
    .set({
      UserId: UserId,
      fcmToken: fcmToken,
      userName: `${firstName} ${lastName}`
    });
};

export const UpdateUserImage = async (image, uid) => {
  try {
    return await firebase
      .database()
      .ref("users/" + uid)
      .update({
        image: image,
      });
  } catch (error) {
    return error;
  }
};
export const DeleteFcmToken = async ( uid) => {
  try {
    return await firebase
      .database()
      .ref("fcmTokens/" + uid)
      .update({
        fcmToken: "",
      });
  } catch (error) {
    return error;
  }
};
