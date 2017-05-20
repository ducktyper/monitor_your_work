(function () {
  logHistory = function(url, title) {
    var data = new FormData();
    data.append('url', url);
    data.append('title', title);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3333/chrome', true);
    xhr.send(data);
  };

  chrome.history.onVisited.addListener(function(page) {
    logHistory(page.url, page.title);
  });

  chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function(tab) {
      logHistory(tab.url, tab.title);
    });
  });
})();
