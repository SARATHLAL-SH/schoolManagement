const subscribeToPushNotifications = async () => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      try {
        const registration = await navigator.serviceWorker.register("/service-worker.js");
        console.log("Service Worker registered:", registration);
  
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            "BErn7s83cgqhG0ITDM1wWdlwSDsAOQ03y7vZjUGCzEDtgYx08kPABdPpLGmSQKYb_IeyYxShnBMppYLclmYo-ts" // Your public VAPID key
          ),
        });
  
        console.log("Push Subscription:", JSON.stringify(subscription));
      } catch (error) {
        console.error("Push subscription failed:", error);
      }
    } else {
      console.warn("Push notifications are not supported in this browser.");
    }
  };
  
  const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };
  