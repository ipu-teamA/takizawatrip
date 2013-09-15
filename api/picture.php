<?php
	$my_picture = array();

	$str = explode("/", $_SERVER["REQUEST_URI"]);
	$user_id = isset($str[4]) ? htmlspecialchars($str[4], ENT_QUOTES) : "no user_id";

	$mysql = mysql_connect("localhost", "g031i043", "g031i043!g031i043");//DB接続

	mysql_select_db("g031i043", $mysql);//DB選択

	/*$mysql = mysql_connect("localhost", "maita", "maita0416");//DB接続

	mysql_select_db("takizawa", $mysql);//DB選択*/

	$query1 = "SELECT * FROM `pictures` LEFT JOIN `tests` ON pictures.user_id=tests.user_id LEFT JOIN `spots` ON pictures.spot_id=spots.spot_id;";//membersテーブルを選択
	$result1 = mysql_query($query1, $mysql);//SQL文実行
		
	if (mysql_num_rows($result1) > 0) {//テーブルにデータが存在する場合
		if (!$result1) {
			echo 'could not run query1: ' . mysql_error();
			exit ;
		}
	}

	/*$query2 = "SELECT * FROM `spots`;";//membersテーブルを選択
	$result2 = mysql_query($query2, $mysql);//SQL文実行
		
	if (mysql_num_rows($result2) > 0) {//テーブルにデータが存在する場合
		if (!$result2) {
			echo 'could not run query2: ' . mysql_error();
			exit ;
		}
	}*/
	$i = 0;
	while ($tmp = mysql_fetch_assoc($result1)) {//データがなくなるまで
		if($tmp['user_id'] == $user_id) {
			$my_picture[$i] = array(
				'picture_id' => $tmp['picture_id'],
				'picture_path' => $tmp['path'],
				'spot_id' => $tmp['spot_id'],
				'spot_name' => $tmp['spot_name']
				);
			$i++;
		}
	}
		//# ↑ JSON 形式にする

		header("Content-Type: text/javascript; charset=utf-8");
		//# ↑ 半分おまじない。JSONで送りますよという合図

		$my_picture = json_encode($my_picture);

		echo $my_picture;

		//var_dump(json_decode($my_picture));
		//# ↑ JSON 形式にエンコードしてechoでGET送信\

?>