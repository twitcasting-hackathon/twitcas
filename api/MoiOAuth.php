<?php
/**
 *
 * (´・ω・`)＜I am Library of TwitCasting.
 *
 */


class MoiOAuth{

	public $access_token;
	public $base;

	public function __construct($access_token){
		$this->access_token = $access_token;

		$this->base = "https://apiv2.twitcasting.tv/";
	}

	public function post( $endpoint, $parameter ){

		$parameter = json_encode($parameter);

		$ch = curl_init($this->base . $endpoint);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $parameter);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			'X-Api-Version: 2.0',
		    "Accept: application/json",
		    "Content-Type: application/json",
			'Authorization: Bearer ' . $this->access_token,
		));
		$result = curl_exec($ch);
		curl_close($ch);

		$result = json_decode( $result );

		return $result;

	}

	public function get( $endpoint ){

		$ch = curl_init($this->base . $endpoint);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		    'X-Api-Version: 2.0',
		    "Accept: application/json",
			'Authorization: Bearer ' . $this->access_token,
		));
		$result = curl_exec($ch);
		curl_close($ch);

		$result = json_decode( $result );

		return $result;

	}

}