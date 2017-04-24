var ebooktitle = document.getElementById('ebooksProductTitle').innerText
var authors = document.getElementsByClassName('contributorNameID')[0].innerText

var ret = {title: ebooktitle, author: authors}
console.log('hi there from nyplcontent. found: ', ret)

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('request received:', request);
    sendResponse(ret);
  }
);