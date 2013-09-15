var win = Ti.UI.currentWindow; //前のwinの情報をもらってる？
var user_id = win.user_id;
var spot_id = win.spot_id;
var dainyuu = win.dai;
var lat = win.latitude;
var lon = win.longitude;
var table = Ti.UI.createTableView();
var header = Ti.UI.createView({
  backgroundColor:'white',
  width: '100%',
  height: '10%'
});
var titleLabel = Ti.UI.createLabel({
    text: '写真選択',
    textAlign: 'center',
    //backgroundColor: 'blue',	backgroundColor: '#347dec',
    backgroundColor:'#008cc0',
    //: '30%',
	height:'60px',
	width: '100%',
    top: 0,
    color: 'white',
    font: {fontSize: 24}
});
var button4 = Ti.UI.createButton({
	title: '戻る',
	top: '2%',
	width: '18%',
	height: "60%",
	left: '1%'
});
button4.addEventListener('click', function(e)
{
	win.close();
});

var label = Ti.UI.createLabel({
	text: dainyuu + 'の写真はどれ？',
	textAlign: 'center',
	width: '100%',
	color: 'black',
	font: {fontSize: 24},
	bottom : '0'
});
Ti.API.info(lat+'こんにちは' + lon);
		header.add(titleLabel);
		header.add(button4);
		header.add(label);
		win.add(header);
// 自身のAndroidの中にある写真情報をとってくる。
function selectPhotosByLocation(targetLat, targetLon, targetDistance) {
	var findfile = require('com.example.timod');
	var ImageFactory = require("fh.imagefactory");
	var list = findfile.get_all_filelist();
	var exifTags = {
		'Date/time' : ImageFactory.TAG_DATETIME,
		'Flash' : ImageFactory.TAG_FLASH,
		'GPS altitude' : ImageFactory.TAG_GPS_ALTITUDE,
		'GPS altitude ref' : ImageFactory.TAG_GPS_ALTITUDE_REF,
		'GPS date stamp' : ImageFactory.TAG_GPS_DATESTAMP,
		'GPS latitude' : ImageFactory.TAG_GPS_LATITUDE,
		'GPS latitude ref' : ImageFactory.TAG_GPS_LATITUDE_REF,
		'GPS longitude' : ImageFactory.TAG_GPS_LONGITUDE,
		'GPS longitude ref' : ImageFactory.TAG_GPS_LONGITUDE_REF,
		'GPS processing method' : ImageFactory.TAG_GPS_PROCESSING_METHOD,
		'GPS timestamp' : ImageFactory.TAG_GPS_TIMESTAMP,
		'Image length' : ImageFactory.TAG_IMAGE_LENGTH,
		'Image width' : ImageFactory.TAG_IMAGE_WIDTH,
		'Camera make' : ImageFactory.TAG_MAKE,
		'Camera model' : ImageFactory.TAG_MODEL,
		'Orientation' : ImageFactory.TAG_ORIENTATION,
		'White balance' : ImageFactory.TAG_WHITEBALANCE
	};
	var exifPhotos = new Array(); // 緯度経度が設定されている写真を格納
	if(list){
		for (var i = 0; i < list.length; i++) {
			var lat = ImageFactory.getExifTag(list[i], ImageFactory.TAG_GPS_LATITUDE);
			var latRef = ImageFactory.getExifTag(list[i], ImageFactory.TAG_GPS_LATITUDE_REF);
			var lon = ImageFactory.getExifTag(list[i], ImageFactory.TAG_GPS_LONGITUDE);
			var lonRef = ImageFactory.getExifTag(list[i], ImageFactory.TAG_GPS_LONGITUDE_REF);

			if (!(lat && lon)) {
				continue;
			}
			var latArr = lat.split(",");
			var latitude = new Array();
			for (var j = 0; j < latArr.length; j++) {
				var temp = latArr[j].split("/");
				latitude[j] = temp[0] / temp[1];
			}
			var lonArr = lon.split(",");
			var longitude = new Array();
			for (var j = 0; j < lonArr.length; j++) {
				var temp = lonArr[j].split("/");
				longitude[j] = temp[0] / temp[1];
			}
			var geoLat = latitude[0] + latitude[1] / 60 + latitude[2] / 3600;
			var geoLon = longitude[0] + longitude[1] / 60 + longitude[2] / 3600;
			if (latRef == "S") {
				geoLat *= -1;
			}
			if (lonRef == "W") {
				geoLon *= -1;
			}
			// 連想配列として写真へのパス、緯度経度を格納
			exifPhotos.push({
				path : list[i],
				lat : geoLat,
				lon : geoLon
			});
		}
		var candidatePhotos = new Array(); // 候補画像を格納
		// 候補を絞る
		for (var i = 0; i < exifPhotos.length; i++) {
			if((targetLat - targetDistance <= exifPhotos[i].lat && exifPhotos[i].lat <= targetLat + targetDistance) &&
			   (targetLon - targetDistance <= exifPhotos[i].lon && exifPhotos[i].lon <= targetLon + targetDistance)){
			   	candidatePhotos.push(exifPhotos[i]);
			}
		}
		return candidatePhotos;
	}else{
		alert('写真がありません！');
	}
}
var range = 0.01; // 要変更、今は約半径１キロ
var check = selectPhotosByLocation(lat, lon, range);
Ti.API.info(check.length);
for(var i = 0; i < check.length; i++){
	Ti.API.info(check[i].path);
	Ti.API.info(check[i].lat);
	Ti.API.info(check[i].lon);
}
//ソート関数
check.sort(
	function(a, b){
		if(Math.sqrt(Math.pow(a["lat"] - lat, 2) + Math.pow(a["lon"] - lon, 2)) > Math.sqrt(Math.pow(b["lat"] - lat, 2) + Math.pow(b["lon"] - lon, 2)))
			return 1;
		else
			return -1;
	});
var tablerow = [];
var row_view = [];
var image = [];
if(check.length){
for(var i = 0; i < check.length && i < 5; i++){
    image[i] = Ti.UI.createImageView({
   		image: "file://" + check[i].path,
        width: '100%',
        height:'200px',
        image_id: i,
    });
    row_view[i] = Ti.UI.createView();
    row_view[i].add(image[i]);
    tablerow[i] = Ti.UI.createTableViewRow({});
	tablerow[i].add(row_view[i]);
	table.appendRow(tablerow[i]);
    Ti.API.info(check[i].path);
    image[i].addEventListener('click', function(e)
    {
    	var httpclient = Ti.Network.createHTTPClient();
    	httpclient.open("POST", "http://www31092u.sakura.ne.jp/~g031i043/takizawa/add_picture.php/" + user_id + "/aaaaa/" + spot_id);
    	httpclient.onload = function(e){
    		Ti.API.info(this.responseText);
			alert(dainyuu + 'チェックインしました');
    		win.close();
    	};
    	httpclient.onerror = function(e){
    		Ti.API.info(e);
			alert('通信エラーが発生しました');
    	};
    	httpclient.send({media: e.source.toBlob()});
        Ti.API.info(image[e.source.image_id].image_id);
    });
}
win.add(table);
Ti.API.info("win1.user_id" + user_id);
}else{
	alert('スポット近くの写真がありません！');
}
