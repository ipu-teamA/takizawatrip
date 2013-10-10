// アカウント登録画面
var win = Ti.UI.currentWindow;

(function(){
	//ユーザ名form
	var name_form = Ti.UI.createTextField({
		color: '#333333',
		hintText: 'ユーザー名',
		height: '10%',
		top: '12%',
		left: '5%',
		width: '75%',
		borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	//パスワードform
	var pass_form = Ti.UI.createTextField({
		color: '#333333',
		hintText: 'パスワード',
		height: '10%',
		top: '25%',
		left: '5%',
		width: '75%',
		borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	// 送信ボタン
	var button3 = Ti.UI.createButton({
		title: '登録',
		top: '45%',
		left: '22%',
		width: '40%',
		height: '13%',
		font:{fontSize:26},
	});
	//戻るボタン
	var button4 = Ti.UI.createButton({
		title: '戻る',
		top: '0.5%',
		left: '1%',
		width: '18%',
		height: '8.5%'
	});

	win.add(name_form);
	win.add(pass_form);
	win.add(button3);
	win.add(button4);

	//登録ボタンを押した時の処理
	button3.addEventListener('click', function(e){
		var name = name_form.getValue();
		var pass = pass_form.getValue();
		var account = Ti.Network.createHTTPClient(); //APIを利用するための記述
		var url = "http://www31092u.sakura.ne.jp/~g031i043/takizawa/account.php/"+ name + "/" + pass;
		account.open("GET", url);
		account.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		
		account.onload = function() {
			Ti.API.info("Received text: " + this.responseText);
			var new_user = JSON.parse(this.responseText);
			var new_user_id = new_user.user_id;
			if(new_user_id == "error"){
				alert("すでに登録されているユーザー名です。");
			}
			else{
				Ti.App.Properties.setInt('id', new_user_id); //登録したユーザーのidを端末登録
				var id = Ti.App.Properties.getInt('id'); //端末に登録したidの呼び出し
			
				var labelNewUserid = Titanium.UI.createLabel({
					text:new_user_id,
					font:{fontSize:20,fontFamily:'Helvetica Neue'},
					textAlign:'center',
					width:'auto'
				});
				Ti.API.info(labelNewUserid);
			//win2.add(labelNewUserid);
				var id = Ti.App.Properties.getInt('id');
				var main_win = Titanium.UI.createWindow({
					url:'takizawa_trip.js',
					user_id:id
				});
		
				Ti.API.info("id::::"+ id);
		
				if(id != null){
					main_win.open();
				}
			}
		}
		account.send();
		
	});
	//戻るボタンが押された時の処理
	button4.addEventListener('click', function(e){
		win.close();
	});
})();