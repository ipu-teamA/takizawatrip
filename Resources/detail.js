
var win = Ti.UI.currentWindow;
var user_id = win.user_id;
Ti.API.user_id = user_id;
var pic_id = win.pic_id;
Ti.API.pic_id = pic_id;
var pic_path = win.pic_path;
Ti.API.pic_path = pic_path;
var pic_name = win.pic_name;
Ti.API.pic_name = pic_name;
var titleLabel4 = Ti.UI.createLabel({
    text: '場所の名前',
    textAlign: 'center',
    //backgroundColor: 'blue',    backgroundColor: '#347dec',
    backgroundColor:'#008cc0',
    height: '9%',
    //: '30%',
    width: '100%',
    top: 0,
    color: 'white',
    font: {fontSize: 24}
});
var view12 = Ti.UI.createView({
  backgroundColor:'white',
  borderRadius: 0,
  top: 0,
  height: '100%',
  width: '100%'
});

view12.add(titleLabel4);
var photo3 = Ti.UI.createImageView({
 image : pic_path,
 top : '10%',
 fullscreen : true
});

var label99 = Ti.UI.createLabel({
 text : pic_name,
 top : '75%',
 left : '4%',
 color : 'black',
 font : {fontSize : 32}
});
var button3 = Ti.UI.createButton({
    title: '戻る',
    top: '0.5%',
    left: '1%',
    width: '18%',
    height: '8.5%'
});

win.addEventListener('click', function(e){ 
	win.close();
	});

var scrollView = Ti.UI.createScrollView({
  contentWidth: 'auto',
  contentHeight: 'auto',
  showVerticalScrollIndicator: true,
  showHorizontalScrollIndicator: true,
  height: '100%',
  width: '100%'
});
view12.add(label99);
view12.add(photo3);
view12.add(button3);
win.add(view12);