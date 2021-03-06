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

console.log(projecturl);

// set global vars
var leaf;
var price = document.getElementById('key').innerHTML;
price = parseInt(price);
// var leaf = "${CUSTOM_MODEL_LEAF_NAME}";
var leaftype;
var data;
var wrapperWidth;
var wrapperHeight;
var url = window.location.href;
var sku;

// resizing listener event
// window.addEventListener("resize", buildAd);

// check for leaf query string
// if (url.indexOf("leaf") > -1) {
//   leaf = url.substring(url.indexOf("=") + 1);
// }
// else {
//   leaf = 0;
// }

// if (leaf == "${CUSTOM_MODEL_LEAF_NAME}") {
//   leaf = 0;
// }

if (price < 1000) {
  leaf = 1;
  console.log('price=' + price);
}
else {
  leaf = 1;
  console.log('price=' + price);
}

// get and parse json data
(function getData() {

  var url;

  if (window.location.hostname == 'playground.local') {
    url = 'json/matrix.json';
  }
  else {
    url = projecturl + '/json/matrix.json';
  }

  var request = new XMLHttpRequest();
  request.open('GET', url, true);

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
  var logo = data.data[leaf].logo;
  var headline = data.data[leaf].headline;
  var subhead = data.data[leaf].subhead;
  var image = data.data[leaf].image;
  var priceReg = data.data[leaf].price_reg;
  var priceDisc = data.data[leaf].price_disc;
  var cta = data.data[leaf].cta;
  sku = data.data[leaf].sku;
  // var url = data.data[leaf].url;

  document.getElementById("logo").src = logo;
  document.getElementById("headline").innerHTML = headline;
  document.getElementById("subhead").innerHTML = subhead;
  document.getElementById("image").src = image;
  document.getElementById("price-reg").innerHTML = priceReg;
  document.getElementById("price-disc").innerHTML = priceDisc;
  document.getElementById("cta").innerHTML = cta;
 
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

    // 970x66
    case 1036:
      // document.getElementById("headline").style.flexDirection = "row";
      break;
  }

  document.getElementById("ad").style.opacity = "1";

}

//add to cart

function injectPixel(pixel) {
    var img = document.createElement("img");
    var src = document.createAttribute("src");
    var axel = Math.random();
    var a = Math.round(axel * 10000000000000);
    src.value = 'https://pubads.g.doubleclick.net/activity;xsp=4456667;ord=1' + a; 
    img.setAttributeNode(src);
    img.setAttribute("id", "pixel");
    document.getElementById("ad").appendChild(img);
    // alert('bam');
}

function pushToCart(event) {
    // parent.STAPLES.cartOverlay.addtoCartAjax([{"partNumber":sku,"quantity":1,"catEntryId":""}, {"partNumber":sku,"quantity":1,"catEntryId":""}], -1, undefined, undefined, "en-US");
    // parent.STAPLES.cartOverlay.addtoCartAjax([{"partNumber":sku,"quantity":1,"catEntryId":""}], -1, undefined, undefined, "en-US");
    parent.STAPLES.cartOverlay.addtoCartAjax([{"partNumber":sku,"quantity":1,"catEntryId":""}], -1, undefined, undefined, "en-US", undefined, undefined, undefined, undefined, [43266]);
    
    // document.write('<img src="https://pubads.g.doubleclick.net/activity;xsp=4456667;ord=1" width=1 height=1 border=0>');
    // document.getElementById("ad").innerHTML = '<img src="https://pubads.g.doubleclick.net/activity;xsp=4456667;ord=1" width=1 height=1 border=0>';
    injectPixel();
}

document.getElementById("cta").addEventListener('click', pushToCart);