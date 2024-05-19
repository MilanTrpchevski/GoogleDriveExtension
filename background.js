chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'search') {
    getAuthToken(true).then(token => {
      return searchGoogleDrive(token, request.query);
    }).then(data => {
      sendResponse({ status: 'success', data: data });
    }).catch(error => {
      console.error('Error:', error);
      sendResponse({ status: 'error', message: error.message });
    });
    return true; // Indicates that we want to send a response asynchronously
  }
});

  
  function getAuthToken(interactive) {
    return new Promise((resolve, reject) => {
      chrome.identity.getAuthToken({interactive: interactive}, (token) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(token);
        }
      });
    });
  }
  
  function searchGoogleDrive(token, query) {
    const url = `https://www.googleapis.com/drive/v3/files?q=name contains '${query}'&key=AIzaSyAVUQRnkcAPPZGnMdP67qZbkHa7yoAHDPo`;
  
    return fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'search') {
      getAuthToken(true).then(token => {
        return searchGoogleDrive(token, request.query);
      }).then(data => {
        sendResponse({status: 'success', data: data});
      }).catch(error => {
        console.error('Error:', error);
        sendResponse({status: 'error', message: error.message});
      });
      return true; // Indicates that we want to send a response asynchronously
    }
  });
  