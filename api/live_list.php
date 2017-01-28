<?php
require_once("MoiOAuth.php");

$at = $_GET["at"];

if ($at){

$mo = new MoiOAuth( $at );

$lists = $mo->get( "search/lives?limit=50&type=tag&context=雑談&lang=ja" );
shuffle( $lists->movies );

foreach( $lists->movies as $list ){

	if ( $list->movie->is_live == true && $list->movie->is_protected == false ){

		$ret[] = array("url" => $list->movie->hls_url, "id" => $list->movie->id);
	
	}

}

header("Content-Type: application/json; charset=UTF-8");

echo json_encode( $ret );

}else{

$message = array( "message" => "error" );

header("Content-Type: application/json; charset=UTF-8");

echo json_encode( $message );

}
