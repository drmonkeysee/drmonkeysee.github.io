function writeMsg(msg) {
  $('#output').text(msg);
}

$(function () {
  if (!Notification) {
    writeMsg('Push notifications not supported!');
    return;
  }

  if (!navigator.serviceWorker) {
    writeMsg('Service worker not supported!');
    return;
  }

  $('#subscribe').click(function () {
    $('#subscribe').prop('disabled', true);
    navigator.serviceWorker.ready.then(function (reg) {
      reg.pushManager.subscribe({userVisibleOnly: true}).then(function (sub) {
        writeMsg('Subscribed successfully');
        $('#subscription').text(sub.endpoint);
        $('#unsubscribe').prop('disabled', false);
      }).catch(function (e) {
        writeMsg('SUB ERROR: ' + e);
        $('#subscribe').prop('disabled', false);
      });
    })
  });

  $('#unsubscribe').click(function () {
    $('#unsubscribe').prop('disabled', true);
    navigator.serviceWorker.ready.then(function (reg) {
      reg.pushManager.getSubscription().then(function (sub) {
        sub.unsubscribe().then(function () {
          $('#subscribe').prop('disabled', false);
          writeMsg('Successfully unsubscribed');
          $('#subscription').text('');
        }).catch(function (e) {
          writeMsg('UNSUB ERROR: ' + e);
          $('#unsubscribe').prop('disabled', false);
        })
      });
    });
  });

  Notification.requestPermission();

  navigator.serviceWorker.register('https://drmonkeysee.github.io/sw.js').then(function (reg) {
    if (reg.installing) {
      writeMsg('Installing service worker...');
    } else if (reg.waiting) {
      writeMsg('Service worker waiting...');
    } else if (reg.active) {
      writeMsg('Service worker ready!');
    }

    navigator.serviceWorker.ready.then(function (reg) {
      reg.pushManager.getSubscription().then(function (sub) {
        if (sub) {
          writeMsg('Found current subscription');
          $('#subscription').text(sub.endpoint);
          $('#subscribe').prop('disabled', true);
          $('#unsubscribe').prop('disabled', false);
        } else {
          writeMsg('Click subscribe to create a subscription');
          $('#subscribe').prop('disabled', false);
          $('#unsubscribe').prop('disabled', true);
        }
      });
    });
  });
})