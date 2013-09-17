<?php

	$domination = array('domination_area', 'domination_count');
	$domination_count = 0;
	$domination_area = array();
	for($i = 0; $i < 10; $i++) {
		$domination_area[$i] = 0;
	}
	$str = explode("/", $_SERVER["REQUEST_URI"]);
	$user_id = isset($str[4]) ? htmlspecialchars($str[4], ENT_QUOTES) : "no user_id";

	$mysql = mysql_connect("localhost", "g031i043", "g031i043!g031i043");//DB接続

	mysql_select_db("g031i043", $mysql);//DB選択

	/*$mysql = mysql_connect("localhost", "maita", "maita0416");//DB接続

	mysql_select_db("takizawa", $mysql);//DB選択*/

	$query1 = "SELECT * FROM `pictures` LEFT JOIN `tests` ON pictures.user_id=tests.user_id LEFT JOIN `spots` ON pictures.spot_id=spots.spot_id;";
	$result1 = mysql_query($query1, $mysql);//SQL文実行

	$query2 = "SELECT * FROM `spots`;";
	$result2 = mysql_query($query2, $mysql);//SQL文実行
		
	if (mysql_num_rows($result1) > 0) {//テーブルにデータが存在する場合
		if (!$result1) {
			echo 'could not run query1: ' . mysql_error();
			exit ;
		}
	}

	if (mysql_num_rows($result2) > 0) {//テーブルにデータが存在する場合
		if (!$result2) {
			echo 'could not run query2: ' . mysql_error();
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
	$j = 0;
	while($tmp2 = mysql_fetch_assoc($result2)) {
		$spot[$j] = $tmp2;
		$j++;
	}

	while ($tmp = mysql_fetch_assoc($result1)) {//データがなくなるまで
		if($tmp['user_id'] == $user_id) {
			for($i = 0; isset($spot[$i]); $i++) {
				if($tmp['spot_id'] == $spot[$i]['spot_id']) {
					$area_id = $tmp['area_id'] - 1;
					$domination_area[$area_id] = 1;
				}
			}
		}
	}
	$tmp_arr = array_count_values($domination_area);
	$domination_count = $tmp_arr['1'];
	$domination = array(
		'domination_area' => join($domination_area),
		'domination_area2' => $domination_area,
		'domination_count' => $domination_count
		);

		header("Content-Type: text/javascript; charset=utf-8");
		//# ↑ 半分おまじない。JSONで送りますよという合図

		$domination = json_encode($domination);

		echo $domination;

		//var_dump(json_decode($domination));
		//# ↑ JSON 形式にエンコードしてechoでGET送信\

?>