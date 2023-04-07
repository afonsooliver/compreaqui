const geturl = decodeURIComponent(window.location.search);
const data = fetch('/data'+geturl);
if (geturl){
  const tags = {'url':'?url=', 'source':'&source=', 'id':'&id=', 'shopid':'&shopid=', 'desc':'&desc=', 'info':'&info='};
var string;
var keys = Object.keys(tags).reverse();
var url  = geturl;
var i = 0 ;
for (var key in tags){
  string = url.split(tags[keys[i]])
  url = string[0];
  tags[[keys[i]]]=string[1];
  i=i+1;
}
gtag('event', 'url_view',tags)
location.href = tags.url
}


