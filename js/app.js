if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' }).then((registration) => {
      console.log('SW kaydedildi:', registration.scope);
      setInterval(() => {
        registration.update();
      }, 10000);
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('Yeni sürüm bulundu, yenileniyor...');
            window.location.reload();
          }
        });
      });
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
