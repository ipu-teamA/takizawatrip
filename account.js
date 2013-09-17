
var win = Ti.UI.currentWindow;

// アカウント登録画面

(function(){
 // TextFormの作成
 var name_form = Ti.UI.createTextField({
  color: '#333333',
  hintText: 'name',
  height: '10%',
  top: '12%',
  left: '5%',
  width: '75%',
  borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
 });
 var pass_form = Ti.UI.createTextField({
  color: '#333333',
  hintText: 'pass',
  height: '10%',
  top: '25%',
  left: '5%',
  width: '75%',
  borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
 });
 // 送信ボタン
 var button3 = Ti.UI.createButton({
  title: 'Submit',
  top: '45%',
  left: '22%',
  width: '40%',
  height: '13%',
  font:{fontSize:26},
 });

var button4 = Ti.UI.createButton({
	title: '戻る',
	top: '0.5%',
	left: '1%',
	width: '18%',
	height: '8.5%'
});


//ここは反映したいウィンドウ(この例はwinにフォームとボタンを表示)を指定する
 win.add(name_form);
 win.add(pass_form);
 win.add(button3);
 win.add(button4);

 button3.addEventListener('click', function(e){
  var name = name_form.getValue();
  var pass = pass_form.getValue();
  var account = Ti.Network.createHTTPClient();
  var url = "http://www31092u.sakura.ne.jp/~g031i043/takizawa/account.php/"+ name + "/" + pass;
  account.open("GET", url);
  account.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  account.onload = function() {
    Ti.API.info("Received text: " + this.responseText);
    var new_user = JSON.parse(this.responseText);
    var new_user_id = new_user.user_id;
    var labelNewUserid = Titanium.UI.createLabel({
    text:new_user_id,
    font:{fontSize:20,fontFamily:'Helvetica Neue'},
    textAlign:'center',
    width:'auto'
   });
   Ti.API.info(labelNewUserid);
 //win2.add(labelNewUserid);
  }
  account.send();
  win.close();
 });
  button4.addEventListener('click', function(e)
{
	win.close();
});
})();