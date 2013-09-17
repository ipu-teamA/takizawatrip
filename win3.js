var win = Ti.UI.currentWindow;
var user_id = win.user_id;
Ti.API.user_id = user_id;
var path = "http://www31092u.sakura.ne.jp/~g031i043/takizawa/picture/";
var photoList = Ti.UI.createWindow({
  backgroundColor: 'white',
  exitOnClose: true,
  fullscreen: false,
  title: 'photo list'
});
var increase = Ti.UI.createWindow({
    backgroundColor: 'black',
    title: 'increase'
});
var view3 = Ti.UI.createView({
    height: '100%',
    width : '100%'
});

var button3 = Ti.UI.createButton({
    title: '戻る',
    top: '0.5%',
    left: '1%',
    width: '18%',
    height: '8.5%'
});

button3.addEventListener('click', function(e){
    increase.close();
});

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



var scrollView = Ti.UI.createScrollView({

  contentWidth: 'auto',

  contentHeight: 'auto',

  showVerticalScrollIndicator: true,

  showHorizontalScrollIndicator: true,

  height: '100%',

  width: '100%'

});

var view12 = Ti.UI.createView({

  backgroundColor:'white',

  borderRadius: 0,

  top: 0,

  height: '100%',

  width: '100%'

});



view12.add(titleLabel4);

var photo = [];

var label = [];



scrollView.add(view3);



(function(){

 var picture = Ti.Network.createHTTPClient();

 var url = "http://www31092u.sakura.ne.jp/~g031i043/takizawa/picture.php/" + Ti.API.user_id;

 picture.open("GET", url);
 picture.setRequestHeader('Content-type', 'application/json; charset=utf-8');
 picture.onload = function() {
  Ti.API.info("Received text: " + this.responseText);

  my_picture = JSON.parse(this.responseText);
  var pic_path = new Array;
  var pic_name = new Array;

Ti.API.info(path + my_picture[0].picture_path);

  for(var i = 0, k = 15; i < 12; i++, k += 110){
   for(var j = 0; j < 3, my_picture[i * 3 + j] != null; j++){
    pic_path[i * 3 + j] = path + my_picture[i * 3 + j].picture_path;
    pic_name[i * 3 + j] = my_picture[i * 3 + j].spot_name;
    var inner_view = Ti.UI.createView({
              width: '29%',
              height: '20%',
              top  : k,
    });

    photo[i * 3 + j] = Ti.UI.createImageView({
              image: pic_path[i * 3 + j],
              fullscreen: false,
              id: i * 3 + j,
              image_name: my_picture[i * 3 + j].picture_path
          });
          label[i * 3 + j] = Ti.UI.createLabel({
              text: pic_name[i * 3 + j],
              bottom : "0px",
              color: 'black',
          });
          inner_view.add(photo[i*3+j]);
          inner_view.add(label[i*3+j]);
          switch((i * 3 + j) % 3){
              case 0:
                  photo[i * 3 + j].left = '2.5%';
                  label[i * 3 + j].left = '5.5%';
                  inner_view.left = '2.5%';
                  break;
              case 1:
                  break;
              case 2:

                  photo[i * 3 + j].right = '2.5%';

                  label[i * 3 + j].right = '5.5%';
                  inner_view.right = '2.5%';
                  break;

          }

          scrollView.add(inner_view);

//          scrollView.add(photo[i * 3 + j]);

//          scrollView.add(label[i * 3 + j]);

          photo[i * 3 + j].addEventListener('click',

              function(e)

              {

               var detail_pic = Titanium.UI.createWindow({

       url:'detail.js',

       pic_id:e.source.id,

       pic_path:photo[e.source.id].image,

       pic_name:label[e.source.id].text,

       user_id:user_id

      });



      detail_pic.open();



          });

      }

  }

 }

 picture.send();

})();







win.add(scrollView);





/*(function(){

 var domination = Ti.Network.createHTTPClient();

 var url = "http://www31092u.sakura.ne.jp/~g031i043/takizawa/domination_area.php/" + Ti.API.user_id;

 domination.open("GET", url);

 domination.setRequestHeader('Content-type', 'application/json; charset=utf-8');

 domination.onload = function() {

  Ti.API.info("Received text: " + this.responseText);

  var dominations = JSON.parse(this.responseText);

  var domination_area = Titanium.UI.createLabel({

   text:dominations.domination_area,

   font:{fontSize:20,fontFamily:'Helvetica Neue'},

   textAlign:'center',

   width:'auto'

 });

  var domination_count = Titanium.UI.createLabel({

   text:dominations.domination_count,

   font:{fontSize:20,fontFamily:'Helvetica Neue'},

   textAlign:'center',

   width:'auto'

 });

  Ti.API.info("domination_area:" + dominations.domination_area);

  Ti.API.info("domination_count:" + dominations.domination_count);

 }

 domination.send();

})();*/

//tabGroup.open();