var papertitle = document.getElementById('productTitle')
var etitle = document.getElementById('ebooksProductTitle')
var titleelement = papertitle == null ? etitle : papertitle
var booktitle = titleelement.innerText;
var authors = document.getElementsByClassName('contributorNameID')[0].innerText

var ret = {title: booktitle, author: authors}
console.log('nyplcontent found: ', ret)

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('request received:', request);
    sendResponse(ret);
  }
);