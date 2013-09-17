//win1の内容を記述
//地図の情報を記述

var win = Ti.UI.currentWindow; //前のwinの情報をもらってる？
var user_id = win.user_id;
// Google Mapsを表示するView[mapView]を生成
var mapView = Ti.UI.createView();

//スポット情報の挿入
var spot = [];
(function(){
 var main = Ti.Network.createHTTPClient();
 var url = "http://www31092u.sakura.ne.jp/~g031i043/takizawa/main.php";
 main.open("GET", url);
 main.setRequestHeader('Content-type', 'application/json; charset=utf-8');
 main.onload = function() {
 Ti.API.info("Received text: " + this.responseText);
 var spots = JSON.parse(this.responseText);
 for(var i = 0; i < spots.length; i++) {
   spot[i] = Ti.Map.createAnnotation({
	   latitude:spots[i].spot_gps_lat, // 緯度
	   longitude:spots[i].spot_gps_lon, // 経度
	   title:spots[i].spot_name,
	   spot_id:spots[i].spot_id,
	   animate:true,
	   pincolor:Titanium.Map.ANNOTATION_RED, // ピン色は指定なしだとiOS[RED], Android[BLUE]
	   bubbleParent: false,//イベントの伝播を防ぐ
 });
 map.addAnnotation(spot[i]); //ピンがたつ
 Ti.API.info(spots[i].spot_name);
 Ti.API.info(spots[i].spot_id);
  };
 }
 main.send();
})();

// ここまではスポットの位置情報取得

// Ti.Mapを使って[map]オブジェクトを生成
var map = Ti.Map.createView({
    mapType:Ti.Map.STANDARD_TYPE, // Mapの表示形式には他にSATELLITE_TYPE, HYBRID_TYPEがある
    regionFit:true,
    userLocation:true // 端末の位置を地図上に示す
    // annotationsで作ったピンを地図に追加 カンマつなぎで複数追加可能
});
Titanium.Geolocation.purpose = 'サンプル';
Titanium.Geolocation.getCurrentPosition(
	 function(e) {
  if(!e.success || e.error){
//   alert('位置情報が取得できませんでした');
   return;
  }
  // 現在地をセット
  latitude = e.coords.latitude;
  longitude = e.coords.longitude;
  // 現在地を動的に表示する
  var currentPos = Titanium.Map.createAnnotation({
   latitude: latitude,
   longitude: longitude,
   //pincolor: Titanium.Map.ANNOTATION_PURPLE,
   //animate: true
  });
  //map.addAnnotation(currentPos);
  map.show(); // 隠していた地図を表示する
  map.setLocation({   // 現在地まで地図をスクロールする
   latitude:latitude,
   longitude:longitude,
   latitudeDelta:0.1,
   longitudeDelta:0.1
   });
   });

mapView.add(map); // mapViewにmapをadd
 map.addEventListener('click', function(e){
    // ピンのタイトルをタップしたときに画面表示
  Ti.API.info('click');
  if(e.clicksource == 'title'){
    var dainyuu = e.title;
    Ti.API.info(e.latitude + '緯度');
    Ti.API.info(e.longitude + '経度');
    Ti.API.info(e.annotation.spot_id);//この場合はannotationでスポットIDを得られる
    var lat = e.latitude;// 緯度
    var lon = e.longitude;// 経度
   var imageSelect = Ti.UI.createWindow({
     backgroundColor: 'white',
     title: '滝沢トリップ',
     exitOnClose: false,
 	 fullscreen: false,
 	 url:'image.js',
 	 user_id:user_id,
 	 spot_id:e.annotation.spot_id,
 	 dai:dainyuu,
 	 latitude:lat,
 	 longitude:lon,
 	 layout:'vertical',
   });
        imageSelect.open();
  }
});

win.add(mapView); // winにmapViewをadd

