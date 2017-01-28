<?php
require_once("MoiOAuth.php");

$id = $_GET["id"];
$at = $_GET["at"];

if ($id && $at){

$mo = new MoiOAuth( $at );

$com = $mo->get( "movies/" . $id . "/comments?limit=20" );

header("Content-Type: application/json; charset=UTF-8");

echo json_encode( $com );

}else{

$message = array( "message" => "error" );

header("Content-Type: application/json; charset=UTF-8");

echo json_encode( $message );

}
