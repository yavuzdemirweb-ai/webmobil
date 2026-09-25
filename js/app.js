if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const reg of registrations) {
      await reg.unregister();
    }
    const cacheNames = await caches.keys();
    for (const name of cacheNames) {
      await caches.delete(name);
    }
    console.log('Eski SW ve cache temizlendi');

    let registration;
    navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' }).then((reg) => {
      registration = reg;
      console.log('Yeni SW kaydedildi:', registration.scope);

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            window.location.reload();
          }
        });
      });
    }).catch((error) => {
      console.log('SW kaydı başarısız:', error);
    });

    setInterval(async () => {
      if (registration) {
        await registration.update();
      }
    }, 5000);
  });
}

let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'inline-block';
});

installBtn.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log('Kullanıcı tercihi:', outcome);
    deferredPrompt = null;
    installBtn.style.display = 'none';
  }
});

window.addEventListener('appinstalled', () => {
  console.log('Uygulama kuruldu');
  installBtn.style.display = 'none';
});
