/*
  Source: https://stackoverflow.com/questions/3749231/download-file-using-javascript-jquery/46012717#46012717
*/
var evt = document.createEvent("MouseEvents");
evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.dispatchEvent(evt);
}


/*
  Loop the above for PNG files
*/
// var baseurl = "https://www.3anet.co.jp/np/secure/7-0001-04-407872/7-0001-04-407872-1.exp/images/1/"; /* up to 92 */
var baseurl = "https://www.3anet.co.jp/np/secure/7-0001-04-407872/7-0001-04-407872-2.exp/images/1/"; /* up to 35 */
var file_extension = ".png";
var end_number = 35;

for (let i = 1; i <= end_number; i++) {
  downloadURI(baseurl + i + file_extension, i + "");
}


/*
  Loop the above for MP3 files
*/
var baseurl = "https://www.3anet.co.jp/np/secure/7-0001-04-407872/7-0001-04-407872-1.exp/attachments/";
var file_extension = ".mp3";
var end_number = 30;
const zeroPad = (num, places) => String(num).padStart(places, '0');

for (let i = 1; i <= end_number; i++) {
  downloadURI(baseurl + zeroPad(i, 2) + file_extension, zeroPad(i, 2));
}
