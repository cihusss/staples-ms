//    \
//    - \
//    |   \
//    |---- \
//    |       \
//    |---------\
//     \          \
//       \--------O-\
//         \----^-|-^-\
//           \___/_\____\            flex-ad framework
//           __/_____\____\___/      written by teo
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// set global vars
// var leaf;
var leaf = "${CUSTOM_MODEL_LEAF_NAME}";
var leaftype;
var data;
var wrapperWidth;
var wrapperHeight;
var url = window.location.href;

// resizing listener event
// window.addEventListener("resize", buildAd);

// check for leaf query string
// if (url.indexOf("leaf") > -1) {
//   // leaf = url.substring(url.indexOf("=") + 1);
// }
// else {
//   leaf = 0;
// }

if (leaf == "${CUSTOM_MODEL_LEAF_NAME}") {
  leaf = 0;
}

// get and parse json data
(function getData() {

  var request = new XMLHttpRequest();
  request.open('GET', 'json/matrix.json', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // success!
      data = JSON.parse(request.responseText);
      buildAd();
    } else {
      // error msg from server
    }
  }

  request.onerror = function() {
    // there was a connection error of some sort
  }

  request.send();

}());

// build ad
function buildAd(event) {

  // total number of keys in json object
  var count = Object.keys(data.data).length;

  // convert leaf value to number if it exist in json object
  if (leaf < count) {
    leaf = Number(leaf, 10);
  }

  // check var type of leaf and set leaftype var
  leaftype = typeof leaf;

  // default to 0 if leaf doesn't exist in json object or is string
  if(leaf > count || leaftype == "string") {
    leaf = 0;
  }

  // set up dynamic content vars
  var headline = data.data[leaf].HEADLINE_1;
  var cta = data.data[leaf].CTA;
  // var url = data.data[leaf].URL;
  var bg = data.data[leaf].BACKGROUND_IMAGE;

  document.getElementById("headline").innerHTML = headline;
  document.getElementById("cta").innerHTML = cta;
  document.getElementById("ad").style.backgroundImage = "url(" + bg + ")";
 
  // get wrapper width
  wrapperWidth = document.getElementById("wrapper").parentNode.offsetWidth;
  wrapperHeight = document.getElementById("wrapper").parentNode.offsetHeight;

  // make ad match iframe size
  document.getElementById("ad").style.width = wrapperWidth + "px";
  document.getElementById("ad").style.height = wrapperHeight + "px";
  
  // set ad width vars
  var adWidth = document.getElementById("ad").offsetWidth;
  var adHeight = document.getElementById("ad").offsetHeight;
  
  // set text var
  var txt = wrapperWidth + " x " + wrapperHeight;
  
  // inject text
  document.getElementById("value").innerHTML = txt;
  
  // console.log(adWidth + ":" + adHeight);

  styleAd();

};

// adjust layout & style
function styleAd(event) {

  switch(wrapperWidth + wrapperHeight) {
    
    // 728x90
    case 818:
      document.getElementById("headline").style.fontSize = "20px";
      document.getElementById("headline").style.marginBottom = "8px";
      document.getElementById("cta").style.padding = "4px 16px";
      document.getElementById("action-box").style.width = "auto";
      document.getElementById("action-box").style.height = "100%";
      document.getElementById("action-box").style.padding = "12px 16px";
      break;

    // 970x90
    case 1030:
      document.getElementById("action-box").style.flexDirection = "row";
      document.getElementById("headline").style.alignSelf = "center";
      document.getElementById("headline").style.fontSize = "18px";
      document.getElementById("headline").style.margin = "0 12px 0 0";
      document.getElementById("cta-wrapper").style.alignSelf = "center";
      document.getElementById("logo").style.width = "36px";
      document.getElementById("action-box").style.width = "auto";
      break;

    // 300x50
    case 350:
      document.getElementById("headline").style.margin = "0 0 2px 0";
      document.getElementById("headline").style.fontSize = "10px";
      document.getElementById("cta").style.padding = "2px 8px";
      document.getElementById("cta").style.fontSize = "10px";
      document.getElementById("action-box").style.width = "auto";
      document.getElementById("action-box").style.padding = "6px 12px";
      document.getElementById("logo").style.width = "27px"
      break;
  }

  document.getElementById("ad").style.opacity = "1";

}