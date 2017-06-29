<?php 
namespace app\api\controller\v1;

use think\Controller;
use app\api\validate\TokenGet;
use app\api\service\UserToken;
use app\lib\exception\BaseException;
class User extends Controller{
	public function getToken($code){
		(new TokenGet)->goCheck();
		$ut = new UserToken($code);
		$token = $ut->get();
		return json(['token'=>$token]);
	}
}