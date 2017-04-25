console.log('starting nypl injection script...')

main()

function slugify(text) {
  return text.toString().toLowerCase().replace(/\s+/g, '+')           // Replace spaces with +
}

function main() {
    var book = getBook();
    if (book != false) {
        queryOverride(book)
    }
}

function insertOverDriveFail() {
    var newDiv = document.createElement('div')
    var text = document.createTextNode('NYPL entry not found.');
    newDiv.appendChild(text);
    var titleDiv = document.getElementById('MediaMatrix');
    var centerCol = document.getElementById('centerCol')
    centerCol.insertBefore(newDiv, titleDiv);
}

function insertOverDriveLink(book) {
    var newDiv = document.createElement('div')
    
    var createA = document.createElement('a');
    var createAText = document.createTextNode('Search NYPL for ' + book.title + ' ...');
    var url = 'https://nypl.overdrive.com/search?query=' + slugify(book.title + ' ' + book.author);
    createA.setAttribute('href', url);
    createA.setAttribute('target', 'x'); // Open in new window.
    createA.appendChild(createAText);
    
    newDiv.appendChild(createA);
    var titleDiv = document.getElementById('MediaMatrix');
    var centerCol = document.getElementById('centerCol')
    centerCol.insertBefore(newDiv, titleDiv);
}

function getBook() {
    try {
        var papertitle = document.getElementById('productTitle')
        var etitle = document.getElementById('ebooksProductTitle')
        var titleelement = papertitle == null ? etitle : papertitle
        var booktitle = titleelement.innerText;
        var authors = document.getElementsByClassName('contributorNameID')[0].innerText
        var ret = {title: booktitle, author: authors}
        return ret;            
    } catch(err) {
        return false;
    }
}

function queryOverride(book) {
  var searchUrl = 'https://nypl.overdrive.com/search?query=';
  searchUrl += slugify(book.author + ' ' + book.title);
  var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
  x.onload = function() {
    try {
        var titles = getBookTitles(x.responseText)
        if (titles.length > 0) {
            insertOverDriveLink(book)
        } else {
            insertOverDriveFail();
        }
    } catch(err) {
        insertOverDriveFail();
    }
  }
  x.send();
}

function getBookTitles(html) {
  const startText = 'window.OverDrive.titleCollection'
  var start = html.indexOf(startText)
  var rest = html.slice(start + startText.length + 3, -1)
  var end = rest.indexOf('}]')
  var titles = rest.slice(0, end + 2)
  var json = JSON.parse(titles)
  var ret = []
  for (var i = 0; i < json.length; i++) {
      ret.push(json[i].firstCreatorName + ' - ' + json[i].title)
  }
  console.log('returning ', ret)
  return ret
}





