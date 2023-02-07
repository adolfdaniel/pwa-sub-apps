const registerServiceWorker = async () => {
  try {
    const { location } = document;
    await navigator.serviceWorker.register('sw.js', { scope: location.pathname });
    console.log('Service worker registered');
  } catch (e) {
    console.log(`Registration failed: ${e}`);
  }
}

// Register the service worker
if (navigator.serviceWorker) {
  registerServiceWorker();
}

const installSubApp = async () => {
  if (navigator.subApps) {
    const totalSubApps = 4;
    const subAppsToInstall = [];
    const url = document.location.pathname;
    const pathname = url.substring(0, url.lastIndexOf('/') + 1);
    for (let i = 0; i < totalSubApps; i++) {
      const subAppId = i + 1;
      subAppsToInstall.push({ install_url: `${pathname}${subAppId}/${subAppId}.html` });
    }
    await navigator.subApps.add(subAppsToInstall);
    console.log('SubApps installed');
  }
};

