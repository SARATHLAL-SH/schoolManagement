export const showNotification = (title, options) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, options);
    } else {
      console.log("Notification permission not granted or not supported.");
    }
  };
  
  // Example usage
 