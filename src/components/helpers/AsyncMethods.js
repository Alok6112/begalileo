import AsyncStorage from "@react-native-community/async-storage";

export const storeLocalData = async (storage_Key, storage_value) => {
  try {
    await AsyncStorage.setItem(storage_Key, JSON.stringify(storage_value));
  } catch (e) {
    // saving error
    console.log(
      "Exception in storing " +
        storage_Key +
        " -- " +
        storage_value +
        " -- " +
        e
    );
  }
};

export const getLocalData = async (storage_Key) => {
  try {
    const value = await AsyncStorage.getItem(storage_Key);

    if (value !== null) {
      return value;
    } else {
      return null;
    }
  } catch (e) {
    // error reading value
    console.log(
      "Exception in Reading " + storage_Key + " -- " + value + " -- " + e
    );
    return null;
  }
};
