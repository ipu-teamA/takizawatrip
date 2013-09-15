Titanium.UI.setBackgroundColor('#FFF');
var Window = Titanium.UI.createWindow({
    title:'滝沢トリップ',
    exitOnClose:true,
    fullscreen: true,
    backgroundColor:'#fff'
});

var view13 = Ti.UI.createView();
var image5 = Ti.UI.createImageView({
    //image: 'takizawa.jpg',
    image: 'takizawa2.jpg',
    top: '4%',
    height: "40%",
    width: '97%'
});

var button2 = Ti.UI.createButton({
    title: 'アカウント登録',
    top: '83%',
    width: '60%',
     height: '10%'
});

view13.add(image5);
view13.add(button2);

// ログインの管理処理
var id = Ti.App.Properties.getInt('id');
if(id == null){

(function(){
var tf = Ti.UI.createTextField({
    color: '#333333',
    hintText: 'ユーザー名',
    height: '10%',
    top: '48%',
    width: '60%',
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

var tf2 = Ti.UI.createTextField({
    color: '#333333',
    hintText: 'パスワード',
    height: '10%',
    top: '60%',
    width: '60%',
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
 // 送信ボタン
var button = Ti.UI.createButton({
    title: 'ログイン',
    //top: 320,
    top: '72%',
    width: '60%',
    height: '10%'
});
 view13.add(tf);
 view13.add(tf2);
 view13.add(button);
 Window.add(view13);
 //ここで先に開いておく
 Window.open();
 button.addEventListener('click', function(e){
  var name = tf.getValue();
  var pass = tf2.getValue();
  var login = Ti.Network.createHTTPClient();
 var url = "http://www31092u.sakura.ne.jp/~g031i043/takizawa/login.php/"+ name + "/" + pass;
  login.open("GET", url);
  login.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  login.onload = function() {
   Ti.API.info("Received text: " + this.responseText);
   var user = JSON.parse(this.responseText);
   var user_id = user.user_id;
   if(user_id != "error") {
   	Ti.App.Properties.setInt('id',user_id);// これでidを端末に記憶する。
    var main_win = Titanium.UI.createWindow({
     url:'takizawa_trip.js',
     exitOnClose:false,　// 次のウインドウだけを閉じたい
     user_id:user_id
    });
    main_win.open();
   }
 else {
    var labelUserid = Titanium.UI.createLabel({
     text:user_id,
     font:{fontSize:20,fontFamily:'Helvetica Neue'},
     textAlign:'center',
     width:'auto'
    });
   }
 //Window.add(labelUserid);
  }
  login.send();
 });
})();

// 新規アカウント登録ページに遷移
button2.addEventListener('click', function(e){
    var win9 = Titanium.UI.createWindow({
    title: '滝沢トリップ',
    backgroundColor: 'white',
    exitOnClose:false,
    fullscreen:true,
    url:'account.js'
    });
    win9.open();
});
}
else{
	var main_win = Titanium.UI.createWindow({
     url:'takizawa_trip.js',
     user_id:id
    });
    main_win.open();
}
