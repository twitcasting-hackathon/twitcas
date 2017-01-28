<?php
require_once("../MoiOAuth.php");

$id = $_GET["id"];
$text = $_GET["text"];
$at = $_GET["at"];

if ($at){

$mo = new MoiOAuth( $at );

$com = $mo->post( "movies/" . $id . "/comments", array("comment" => $text) );

header("Content-Type: application/json; charset=UTF-8");

echo json_encode( $com );

}else{

$message = array( "message" => "error" );

header("Content-Type: application/json; charset=UTF-8");

echo json_encode( $message );

}
