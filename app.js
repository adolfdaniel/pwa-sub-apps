const registerServiceWorker = async () => {
  try {
    await navigator.serviceWorker.register('/sw.js', { scope: '/' });
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
  const subAppId = document.getElementById('subAppId').value;
  // Alert if subAppId is not a number or is not between 1 and 4
  if (isNaN(subAppId) || subAppId < 1 || subAppId > 4) {
    alert('Please enter a number between 1 and 4');
    return;
  }
  const sw = await navigator.serviceWorker.ready;
  const subAppSW = await sw.active.postMessage({ action: 'addSubApp', appId: subAppId });
  console.log('subApp', subAppSW);

  if (navigator.subApps) {
    await navigator.subApps.add([{ install_url: `/${subAppId}/${subAppId}.html` }]);
    console.log('SubApp installed');
  }
};

