// public/service-worker.js
self.addEventListener("push", (event) => {
    const data = event.data.json();
    const { title, body, icon } = data;
  
    const options = {
      body,
      icon,
    };
  
    event.waitUntil(self.registration.showNotification(title, options));
  });