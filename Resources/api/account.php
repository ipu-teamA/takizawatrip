<?php
$str = explode("/", $_SERVER["REQUEST_URI"]);
//$name = isset($str[4]) ? htmlspecialchars($str[4], ENT_QUOTES) : "no name";//issset関数は中身が入っているかどうかを判断
$name = isset($str[4]) ? $str[4] : "no name";
$pass = isset($str[5]) ? htmlspecialchars($str[5], ENT_QUOTES) : "no pass";
$pass = sha1($pass);

$mysql = mysql_connect("localhost", "g031i043", "g031i043!g031i043");//DB接続
mysql_select_db("g031i043", $mysql);//DB選択

$query = "SELECT * FROM `tests`;";//testsテーブルを選択
$result = mysql_query($query, $mysql);//SQL文実行

$flag = 0;
while ($tmp = mysql_fetch_assoc($result)) {//データがなくなるまで	
			if($name == $tmp["user_name"]) {
				$flag = 1;
				/*if (sha1($pass) == $tmp["password"]) {
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
				}*/
			break;	
			}
			
}	

//var_dump($name);
if($name == ""){
	$flag = 1;
}
if(preg_match("/%/i", $name)) {
	$flag = 1;

}
//echo $flag;

//var_dump($flag);

if($flag == 1){
	$json_array = array(
		'user_id' => 'error',
		'created' => date("Y-m-d")
	);
	//JSONで送るための記述
	header("Content-Type: text/javascript; charset=utf-8");
	$encode = json_encode($json_array);
	echo $encode;//JSON形式にエンコードしてGETで送信
}
else{

$query1 = "INSERT INTO tests(user_id, user_name, password, created) VALUES (NULL, '$name', '$pass', NOW());"; //テーブルにデータを追加
$result1 = mysql_query($query1, $mysql);

//JSON形式にする
$json_array = array(
	'user_id' => mysql_insert_id(),
	'created' => date("Y-m-d")
);
//JSONで送るための記述
header("Content-Type: text/javascript; charset=utf-8");
$encode = json_encode($json_array);
echo $encode;//JSON形式にエンコードしてGETで送信
}
?>