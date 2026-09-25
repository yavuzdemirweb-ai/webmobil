if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
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
  }
}, 3000);

if (installBtn) {
  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      deferredPrompt = null;
      installBtn.style.display = 'none';
    } else {
      alert('Tarayici menusunden "Uygulamayi Kur" secenekini ekleyin.');
    }
  });
}

window.addEventListener('appinstalled', () => {
  if (installBtn) installBtn.style.display = 'none';
});
