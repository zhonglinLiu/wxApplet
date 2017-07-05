<?php 
namespace app\api\controller\v1;

use think\Controller;
use app\api\validate\TokenGet;
use app\api\service\UserToken;
use app\lib\exception\BaseException;
use think\Cache;
class User extends Controller{
	public function getToken($code){
		(new TokenGet)->goCheck();
		$ut = new UserToken($code);
		$token = $ut->get();
		return json(['token'=>$token]);
	}

	public function validToken($token){
		echo $token;
		exit;
		if(!$token){
			throw new BannerException('token不能为空',400,40001);
		}
		if(Cache::get($token)){
			return ['valid'=>true];
		}
		return ['valid'=>false];
	}
}