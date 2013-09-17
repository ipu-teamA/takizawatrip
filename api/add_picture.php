<?php
	$str = explode("/", $_SERVER["REQUEST_URI"]);
	$user_id = isset($str[4]) ? htmlspecialchars($str[4], ENT_QUOTES) : "no user_id";
	$pic_name = isset($str[5]) ? htmlspecialchars($str[5], ENT_QUOTES) : "no pic_name";
	$spot_id = isset($str[6]) ? htmlspecialchars($str[6], ENT_QUOTES) : "no spot_id";
	//# ↑ GET送信を処理。三項演算子を用いて、中身が入っていないときは入っていないことを明示的にしている。isset関数は、中身が入っているか判断している
	
	$fname = $pic_name = $_FILES['media']['name'] . '.jpg';
	$target_path = "picture/";
	$target_path = $target_path.$fname; 
	if(!move_uploaded_file($_FILES['media']['tmp_name'],$target_path)){
		die( "{\"error\":\"Can not Upload Image.{$fname}\"}");
		$user_id = null;
	}


	$mysql = mysql_connect("localhost", "g031i043", "g031i043!g031i043");//DB接続

	mysql_select_db("g031i043", $mysql);//DB選択

	$query1 = "INSERT INTO pictures(picture_id, user_id, path, spot_id, created) VALUES (NULL, '$user_id', '$pic_name', '$spot_id', NOW());"; //テーブルにデータを追加

	$result1 = mysql_query($query1, $mysql);

	$json_array = array(
		'picture_id' => mysql_insert_id(),
		'created' => date("Y-m-d")
	);
	//# ↑ JSON 形式にする
	header("Content-Type: text/javascript; charset=utf-8");
	//# ↑ 半分おまじない。JSONで送りますよという合図

	$encode = json_encode($json_array);

	echo $encode;
	//# ↑ JSON 形式にエンコードしてechoでGET送信
	//$decode = json_decode($encode);

	//var_dump($decode);

?>