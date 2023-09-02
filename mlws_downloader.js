/*
  General idea:

  The MLWS (Wisebook) reader loads a book.json object given an id. For
  example:

    https://ebook.athuman.com/vars/v2store/MLWSebook/1449/stream/book.json?_=1693118705895

  The JSON files contains the following important keys:

    `bookid`
    `bookid_orig`
    `pages`

  The `bookid` is the e-book id also found in the URL as in
  ../vars/v2store/MLWSebook/{bookid}/.... whereas `bookid_orig`
  denotes the starting page.

  Actually it turns out the only important part is:

    https://ebook.athuman.com/vars/v2store/MLWSebook/1449/stream/1/page.json

  where `1449` is the ebook id. The number after ../stream/{number} is
  the page number. The number of pages is determined by the `pages`
  key.
*/

// Source: https://stackoverflow.com/questions/3749231/download-file-using-javascript-jquery/46012717#46012717
var evt = document.createEvent("MouseEvents");
evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.dispatchEvent(evt);
}

// Source: https://www.educative.io/answers/how-to-read-a-json-file-from-a-url-in-javascript
function loadJSON(path, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        success(JSON.parse(xhr.responseText));
      }
      else {
        error(xhr);
      }
    }
  };
  xhr.open('GET', path, true);
  xhr.send();
}

function downloadBook(bookid, num_pages, sleep_time) {
  var base_url = "https://ebook.athuman.com/vars/v2store/MLWSebook/" + bookid + "/stream/";
  var pad = String(num_pages).length;

  for (let i = 1; i <= num_pages; i++) {
    var asyncProcess = async () => {
      await new Promise(r => setTimeout(r, i * sleep_time));
      loadJSON(base_url + i + "/page.json", function(data) {
	var filename = data["files"][100]["src"][0]["src"];
	downloadURI(base_url + i + "/" + filename, String(i).padStart(pad, '0') + ".jpg");
      }, 'jsonp');
    }
    asyncProcess();
  }
}

downloadBook(1319, 40, 1000);
