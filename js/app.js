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
