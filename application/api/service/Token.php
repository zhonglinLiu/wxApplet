<?php 
namespace app\api\service;
use think\Cache;
use think\Request;
use app\lib\exception\BaseException;
use app\lib\exception\TokenException;
use app\lib\enum\ScopeEnum;
class Token{
	protected static $inc = null;
	protected function __construct(){

	}
	public static function __callStatic($func,$argu){
		self::instance();
		self::$inc->$func($argu);
	}
	public static function instance(){
		if(is_null(self::$inc)){
			self::$inc = new self;
		}
		return self::$inc;
	}
	public function generateToken($key=''){
		$randChars = generateRandChars(32);
		$request_time = $_SERVER['REQUEST_TIME_FLOAT'];
		$salt = config('secret.salt');
		return md5($randChars.$request_time.$salt);
	}

	public function getCurrentTokenVal($key){
		$token = Request::instance()->header('token');
		if(!$token){
			throw new TokenException;
		}
		if(!Cache::has($token))
			throw new TokenException;
		$vars = Cache::get($token);
		if(!$vars){
			throw new TokenException;
		}
		if(!is_array($vars)){
			$vars = json_decode($vars);
		}
		if(array_key_exists($key,$vars)){
			return $vars[$key];
		}
		return $vars;
	}

	public function getCurrentUid(){
		$vars = $this->getCurrentTokenVal('uid');
		return $vars;
	}

	public function checkUserScope(){
		$scope = Token::instance()->getCurrentTokenVal('scope');
		if(!empty($scope)){
			if($scope>=ScopeEnum::USER){
				return true;
			}
			else{
				throw new ForbiddenException;
			}
		}else{
			throw new TokenException();
		}
	}

	public function onlyUserScope(){
		$scope = Token::instance()->getCurrentTokenVal('scope');
		if(!empty($scope)){
			if($scope==ScopeEnum::USER){
				return true;
			}
			else{
				throw new ForbiddenException;
			}
		}else{
			throw new TokenException;
		}
	}


	public function checkUserIsSelf($uid){
		$currentUid = $this->getCurrentUid('uid');
		if($uid!=$currentUid){
			return false;
		}
		return true;
	}

	


}