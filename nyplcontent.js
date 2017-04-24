var ebooktitle = document.getElementById('ebooksProductTitle').innerText
var authors = document.getElementsByClassName('contributorNameID')[0].innerText

console.log('hi there from nyplcontent')

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('request received:', request);
    sendResponse('title: ' + ebooktitle + ' authorlist:' + authors);
  }
);