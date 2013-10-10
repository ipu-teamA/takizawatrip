
Titanium.UI.setBackgroundColor('#000');
// create tab group
var tabGroup = Titanium.UI.createTabGroup({
	title:'滝沢トリップ',
});

var titleLabel = Ti.UI.createLabel({
	backgroundColor: '#347dec',
	color: 'white',
	width: '100%',
	height: '1%',
	textAlign: 'center',
	font: {fontSize: 40},
	top: 0,
	text: '滝沢トリップ'
});

//create base UI tab and root window
var win = Ti.UI.currentWindow;

var user_id = win.user_id;

var win1 = Titanium.UI.createWindow({
    title:'滝沢トリップ',
    backgroundColor:'#fff',
    exitOnClose:false,
    url: 'win1.js',
    user_id:user_id,
});
var tab1 = Titanium.UI.createTab({
    icon:'KS_nav_views.png',
    title:'地図',
    window:win1
});

// こっからタブ２

var win2 = Titanium.UI.createWindow({
    title:'滝沢トリップ',
    backgroundColor:'#87CEEB',
    user_id:user_id,
    url: 'win2.js'
});
var tab2 = Titanium.UI.createTab({
    icon:'KS_nav_ui.png',
    title:'制覇状況',
    window:win2
});

var win3 = Titanium.UI.createWindow({
    title:'滝沢トリップ',
  	exitOnClose: true,
  	fullscreen: false,
    backgroundColor:'#fff',
    url: 'win3.js',
    user_id:user_id,
});

var tab3 = Titanium.UI.createTab({
    icon:'KS_nav_views.png',
    title:'写真一覧',
    window:win3
});

/*設定画面の一時削除
var settingwin = Titanium.UI.createWindow({
    title:'滝沢トリップ',
    backgroundColor:'#fff',
    exitOnClose: true,
    fullscreen: false,
    url: 'settingwin.js'
});

var tab4 = Titanium.UI.createTab({
    icon:'KS_nav_ui.png',
    title:'設定',
    window:settingwin
});
*/
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);
//tabGroup.addTab(tab4);

tabGroup.open();