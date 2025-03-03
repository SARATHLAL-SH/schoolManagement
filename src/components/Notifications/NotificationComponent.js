import React, { useEffect } from "react";

const publicVapidKey =
  "BErn7s83cgqhG0ITDM1wWdlwSDsAOQ03y7vZjUGCzEDtgYx08kPABdPpLGmSQKYb_IeyYxShnBMppYLclmYo-ts";

const NotificationComponent = () => {
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    requestNotificationPermission();
    registerServiceWorkerAndSubscribe();
  }, []);

  // Request Notification Permission
  const requestNotificationPermission = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        console.log(
          permission === "granted"
            ? "Notification permission granted."
            : "Notification permission denied."
        );
      });
    } else {
      console.log("This browser does not support notifications.");
    }
  };

  // Register Service Worker and Subscribe to Push Notifications
  const registerServiceWorkerAndSubscribe = async () => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      try {
        const registration = await navigator.serviceWorker.register(
          "/service-worker.js"
        );
        console.log("Service Worker registered:", registration);

        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
        });

        console.log("Push Subscription:", JSON.stringify(subscription));
        sendSubscriptionToServer(subscription);
      } catch (error) {
        console.error("Push subscription failed:", error);
      }
    } else {
      console.warn("Push notifications are not supported in this browser.");
    }
  };

  // Convert VAPID key to Uint8Array
  const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  // Send Subscription to Backend
  const sendSubscriptionToServer = (subscription) => {
    fetch("http://localhost:8081/send-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subscription, userId }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Subscription saved on the server.");
        } else {
          console.error("Failed to save subscription.");
        }
      })
      .catch((error) => console.error("Error sending subscription:", error));
  };

  return (
    <div>
      <h1>Notification Example</h1>
    </div>
  );
};

export default NotificationComponent;
