<?php
	$spot = array();

	$mysql = mysql_connect("localhost", "g031i043", "g031i043!g031i043");//DB接続

	mysql_select_db("g031i043", $mysql);//DB選択

	/*$mysql = mysql_connect("localhost", "maita", "maita0416");//DB接続

	mysql_select_db("takizawa", $mysql);//DB選択*/

	$query = "SELECT * FROM `spots`;";//membersテーブルを選択
	$result = mysql_query($query, $mysql);//SQL文実行
		
	if (mysql_num_rows($result) > 0) {//テーブルにデータが存在する場合
		if (!$result) {
			echo 'could not run query: ' . mysql_error();
			exit ;
		}
	}

	$i = 0;
	while ($tmp = mysql_fetch_assoc($result)) {//データがなくなるまで	
		$spot[$i] = array(
			'spot_id' => $tmp['spot_id'],
			'spot_name' => $tmp['spot_name'],
			'spot_gps_lat' => $tmp['spot_gps_lat'],
			'spot_gps_lon' => $tmp['spot_gps_lon']
			);
		$i++;
	}
		//# ↑ JSON 形式にする

		header("Content-Type: text/javascript; charset=utf-8");
		//# ↑ 半分おまじない。JSONで送りますよという合図

		$spot = json_encode($spot);

		echo $spot;
		//# ↑ JSON 形式にエンコードしてechoでGET送信
?>