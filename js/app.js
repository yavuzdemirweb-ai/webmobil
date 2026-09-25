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
    console.log('Tum cache ve SW temizlendi');

    navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' }).then((registration) => {
      console.log('SW kaydedildi:', registration.scope);
    }).catch((error) => {
      console.log('SW kaydi basarisiz:', error);
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

setTimeout(() => {
  if (installBtn && installBtn.style.display === 'none') {
    installBtn.style.display = 'inline-block';
    installBtn.textContent = 'Uygulamayı Kur';
  }
}, 3000);

if (installBtn) {
  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log('Kullanici tercihi:', outcome);
      deferredPrompt = null;
      installBtn.style.display = 'none';
    } else {
      alert('Uygulamayı tarayıcı menüsünden "Uygulamayı Kur" seçeneği ile ekleyin.');
    }
  });
}

window.addEventListener('appinstalled', () => {
  console.log('Uygulama kurulddu');
  if (installBtn) installBtn.style.display = 'none';
});
