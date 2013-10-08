<?php
date_default_timezone_set('Asia/Tokyo');//時間を日本に合わせる

$str = explode("/", $_SERVER["REQUEST_URI"]);
$name = isset($str[4]) ? htmlspecialchars($str[4], ENT_QUOTES) : "no name";//issset関数で中身が入っているか判断
$pass = isset($str[5]) ? htmlspecialchars($str[5], ENT_QUOTES) : "no pass";

$mysql = mysql_connect("localhost", "g031i043", "g031i043!g031i043");//DB接続

mysql_select_db("g031i043", $mysql);//DB選択

$query = "SELECT * FROM `tests`;";//testsテーブルを選択
$result = mysql_query($query, $mysql);//SQL文実行
		
if (mysql_num_rows($result) > 0) {//テーブルにデータが存在する場合
	if (!$result) {
		echo 'could not run query: ' . mysql_error();
		exit ;
	}
}

if (isset($name) && isset($pass)) {
	if (!empty($name) && !empty($pass)) {
		while ($tmp = mysql_fetch_assoc($result)) {//データがなくなるまで	
			if($name == $tmp["user_name"]) {
				if (sha1($pass) == $tmp["password"]) {
					$json_array = array(//JSON形式にする
						'time' => date("Y-m-d H:i:s"),
						'name' => $name,
						'pass' => $pass,
						'user_id' => $tmp["user_id"]
					);

					header("Content-Type: text/javascript; charset=utf-8");//JSON形式で送るための記述

					$encode = json_encode($json_array);

					echo $encode;//JSON形式にエンコードしてechoでGET送信
				}
				else {
					$json_array = array(//JSON形式にする
						'time' => date("Y-m-d H:i:s"),
						'name' => $name,
						'pass' => $pass,
						'user_id' => 'error'
					);

					header("Content-Type: text/javascript; charset=utf-8");//JSON形式で送るための記述

					$encode = json_encode($json_array);

					echo $encode;
					break;
				}
			}
					/*else {
						if (mysql_fetch_assoc($result1) == FALSE) {
							break;
						}
					}*/
		}
	}
}

?>