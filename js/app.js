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
    console.log('Tüm cache ve SW temizlendi');

    navigator.serviceWorker.register('/sw.js?' + Date.now(), { updateViaCache: 'none' }).then((registration) => {
      console.log('SW kaydedildi:', registration.scope);
    }).catch((error) => {
      console.log('SW kaydı başarısız:', error);
    });
  });
}

let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installBtn) installBtn.style.display = 'inline-block';
});

if (installBtn) {
  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log('Kullanıcı tercihi:', outcome);
      deferredPrompt = null;
      installBtn.style.display = 'none';
    }
  });
}

window.addEventListener('appinstalled', () => {
  console.log('Uygulama kuruldu');
  if (installBtn) installBtn.style.display = 'none';
});
