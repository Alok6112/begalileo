import PushNotification from "react-native-push-notification";

const createChannels = () => {
  PushNotification.createChannel({
    channelId: "test-channel",
    channelName: "Test Channel",
  });
};

const showNotification = (title, message) => {
  createChannels();
  PushNotification.requestPermissions();
  PushNotification.localNotification({
    channelId: "test-channel",
    title: title,
    message: message,
    id: "1234",
  });
};

export { showNotification, createChannels };
