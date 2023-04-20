const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent Chrome <= 67 from automatically showing the prompt
  event.preventDefault();

  // Stash the event so it can be triggered later.
  deferredPrompt = event;

  // Show the install button
  butInstall.style.display = 'block';
});

// Handle the install button click event
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show the prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }

    // Clear the deferredPrompt variable since it's no longer needed
    deferredPrompt = null;

    // Hide the install button
    butInstall.style.display = 'none';
  }
});

// Handle the appinstalled event
window.addEventListener('appinstalled', (event) => {
  console.log('App installed', event);
});
