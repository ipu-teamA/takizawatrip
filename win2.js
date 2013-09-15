
(function(){
	 var win = Ti.UI.currentWindow;
	 var user_id = win.user_id;
	 Ti.API.info(user_id);
	 var domination = Ti.Network.createHTTPClient();
	 var url = "http://www31092u.sakura.ne.jp/~g031i043/takizawa/domination_area.php/" + user_id;
	 domination.open("GET", url);
	 domination.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	 domination.onload = function() {
	 Ti.API.info("Received text: " + this.responseText);
	 var dominations = JSON.parse(this.responseText);
	 Ti.API.info("domination_area:" + dominations.domination_area);
	 var y = dominations.domination_area;
	 var z = dominations.domination_count;
var x = y;
x = parseInt(x*1, 2);
var view = Ti.UI.createView();

var image = Ti.UI.createImageView({
	image: './takizawa/oogama.png',
	left: 0,
	width: '90%',
	height: '100%'
})
var image2 = Ti.UI.createImageView({
	image: './takizawa/shinoki.png',
	left: 0,
	width: '90%',
	height: '100%'
})
var image3 = Ti.UI.createImageView({
	image: './takizawa/koiwai.png',
	left :0,
	width: '90%',
	height: '100%'
})
var image4 = Ti.UI.createImageView({
	image: './takizawa/oosawa.png',
	left :0,
	width: '90%',
	height: '100%'
})
var image5 = Ti.UI.createImageView({
	image: './takizawa/ukai.png',
	left :0,
	width: '90%',
	height: '100%'
})
var image6 = Ti.UI.createImageView({
	image: './takizawa/motomura.png',
	left: 0,
	width: '90%',
	height: '100%'
})

var image7 = Ti.UI.createImageView({
	image: './takizawa/ubayashiki.png',
	left: 0,
	width: '90%',
	height: '100%'
})

var image8 = Ti.UI.createImageView({
	image: './takizawa/toubu.png',
	left :0,
	width: '90%',
	height: '100%'
})

var image9 = Ti.UI.createImageView({
	image: './takizawa/yanagisawa.png',
	left :0,
	width: '90%',
	height: '100%'
})

var image10 = Ti.UI.createImageView({
	image: './takizawa/ippongi.png',
	left :0,
	width: '90%',
	height: '100%'
})
var image11 = Ti.UI.createImageView({
	image: './takizawa/hakushi.png',
	left :0,
	width: '90%',
	height: '100%'
})
var gaze0 = Ti.UI.createImageView({
	image: './gaze/0.png',
	right :0,
	width: '10%',
	height: '100%'
})
var gaze1 = Ti.UI.createImageView({
	image: './gaze/1.png',
	right :0,
	width: '10%',
	height: '100%'
})
var gaze2 = Ti.UI.createImageView({
	image: './gaze/2.png',
	right :0,
	width: '10%',
	height: '100%'
})
var gaze3 = Ti.UI.createImageView({
	image: './gaze/3.png',
	right :0,
	width: '10%',
	height: '100%'
})
var gaze4 = Ti.UI.createImageView({
	image: './gaze/4.png',
	right :0,
	width: '10%',
	height: '100%'
})
var gaze5 = Ti.UI.createImageView({
	image: './gaze/5.png',
	right :0,
	width: '10%',
	height: '100%'
})
var gaze6 = Ti.UI.createImageView({
	image: './gaze/6.png',
	right :0,
	width: '10%',
	height: '100%'
})
var gaze7 = Ti.UI.createImageView({
	image: './gaze/7.png',
	right :0,
	width: '10%',
	height: '100%'
})
var gaze8 = Ti.UI.createImageView({
	image: './gaze/8.png',
	right :0,
	width: '10%',
	height: '100%'
})
var gaze9 = Ti.UI.createImageView({
	image: './gaze/9.png',
	right :0,
	width: '10%',
	height: '100%'
})
var gaze10 = Ti.UI.createImageView({
	image: './gaze/10.png',
	right :0,
	width: '10%',
	height: '100%'
})

if(x & parseInt(1000000000, 2)){
view.add(image);
}
if(x & parseInt(100000000, 2)){
view.add(image2);
}
if(x & parseInt(10000000, 2)){
view.add(image3);
}
if(x & parseInt(1000000, 2)){
view.add(image4);
}
if(x & parseInt(100000, 2)){
view.add(image5);
}
if(x & parseInt(10000, 2)){
view.add(image6);
}
if(x & parseInt(1000, 2)){
view.add(image7);
}
if(x & parseInt(100, 2)){
view.add(image8);
}
if(x & parseInt(10, 2)){
view.add(image9);
}
if(x & parseInt(1, 2)){
view.add(image10);
}
view.add(image11);
if(z == 0){
view.add(gaze0);
}
if(z == 1){
view.add(gaze1);
}
if(z == 2){
view.add(gaze2);
}
if(z == 3){
view.add(gaze3);
}
if(z == 4){
view.add(gaze4);
}
if(z == 5){
view.add(gaze5);
}
if(z == 6){
view.add(gaze6);
}
if(z == 7){
view.add(gaze7);
}
if(z == 8){
view.add(gaze8);
}
if(z == 9){
view.add(gaze9);
}
if(z == 10){
view.add(gaze10);
}
win.add(view);
win.open();// ここでwinを開いている
	}
	domination.send();
})();