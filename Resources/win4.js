//win4の内容を記述

var win = Ti.UI.currentWindow;

// viewを作ります
var view15 = Ti.UI.createView();

// labelを作ります

var label9 = Ti.UI.createLabel({
    text: '＜ SNS連携 ＞',
    //textAlign: 'center',
    //backgroundColor: 'blue',
    //backgroundColor:'#008cc0',
    left:'5%',
    top: '5%',
    font:{fontSize:26},
 //   height: '20%',
//    width: '40%',
    color: 'black'
});

var label5 = Ti.UI.createLabel({
    text: 'twitter',
    //textAlign: 'left',
    //backgroundColor: 'blue',
    //backgroundColor:'#008cc0',
    font:{fontSize:26},
    left: '5%',
    top: '18%',
    height: '20%',
    width: '30%',
    color: 'black'
});

var label6 = Ti.UI.createLabel({
    text: 'facebook',
    //textAlign: 'left',
    //backgroundColor: 'blue',
    //backgroundColor:'#008cc0',
    left: '5%',
    font:{fontSize:26},
    top: '35%',
//    height: '20%',
//    width: '30%',
    color: 'black'
});

//buttonをつくります

var button15 = Ti.UI.createButton({
    title: 'ログアウトする',
    top: '55%',
    font:{fontsize:22},
    width: '65%',
    height: '13%'
});

var onoff = Titanium.UI.createSwitch({
        value:false,
        left:'55%',
        top: '20%',
        height: '12%'
});

var onoff2 = Titanium.UI.createSwitch({
        value:false,
        left:'55%',
        top: '35%',
        height: '12%'
});

//buttonのイベント処理

button15.addEventListener('click', function(e){
    Ti.UI.currentWindow.close();
    Ti.Android.currentActivity.finish();
});

//viewに追加します
view15.add(label9);
view15.add(label5);
view15.add(label6);
view15.add(button15);
view15.add(onoff);
view15.add(onoff2);

// viewをwinに追加します
win.add(view15);