(function () {
  logHistory = function(url, title) {
    var time = +new Date();
    chrome.storage.sync.set({'recordHistory': { time: time, url: url, title: title }}, function () {
      chrome.storage.sync.get('recordHistory', function (data) {
        console.log(data);
      });
    });
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
