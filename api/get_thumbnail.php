<?php
require_once("MoiOAuth.php");

$user = $_GET["user"];

if ($user){

$mo = new MoiOAuth( $at );

//$image = $mo->get( "users/twitcasting_jp/live/thumbnail?size=small&position=latest" );
$header = get_headers("https://apiv2.twitcasting.tv/users/" . $user . "/live/thumbnail?size=small&position=latest");

$url = preg_replace('@^Location: @','',$header[7]);

$json = array("url" => $url);

header("Content-Type: application/json; charset=UTF-8");

echo json_encode( $json );

}else{

$message = array( "message" => "error" );

header("Content-Type: application/json; charset=UTF-8");

echo json_encode( $message );

}
