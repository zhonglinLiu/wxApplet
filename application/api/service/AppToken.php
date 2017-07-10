<?php 
namespace app\api\service;
use think\Cache;
use think\Exception;
class AppToken extends Token{
	protected $app;
	public function __construct($app){
		$this->app = $app;
	}

	public function get(){
		$token = $this->generateToken();
		$arr = [
			'uid'=>$this->app->id,
			'app_id'=>$this->app->app_id,
			'scope'=>$this->app->scope
		];
		$rel = Cache::set($token,$arr,7200);
		if(!$rel){
			throw new Exception();
			return false;
		}
		return $token;
	}
}