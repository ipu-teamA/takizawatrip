<?php
	$str = explode("/", $_SERVER["REQUEST_URI"]);
	$name = isset($str[4]) ? htmlspecialchars($str[4], ENT_QUOTES) : "no name";
	$pass = isset($str[5]) ? htmlspecialchars($str[5], ENT_QUOTES) : "no pass";
	$pass = sha1($pass);
	//# ↑ GET送信を処理。三項演算子を用いて、中身が入っていないときは入っていないことを明示的にしている。isset関数は、中身が入っているか判断している

	$mysql = mysql_connect("localhost", "g031i043", "g031i043!g031i043");//DB接続

	mysql_select_db("g031i043", $mysql);//DB選択

	$query1 = "INSERT INTO tests(user_id, user_name, password, created) VALUES (NULL, '$name', '$pass', NOW());"; //テーブルにデータを追加

	$result1 = mysql_query($query1, $mysql);

	$json_array = array(
		'user_id' => mysql_insert_id(),
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