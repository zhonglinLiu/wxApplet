<?php 
namespace app\api\service;
use think\Exception;
use think\Cache;
class UserToken{
	protected $appid;
	protected $secret;
	protected $code;
	protected $url;
	public function __construct($code){
		$this->appid = config('wx.appid');
		$this->secret = config('wx.secret');
		$this->code = $code;
		$this->url = sprintf(config('wx.url'),$this->appid,$this->secret,$this->code);
	}
	public function get(){
		$result = doCurl($this->url);
		$wxresult = json_decode($result,true);
		if(empty($wxresult)){
			throw new Exception("获取openid失败");
		}
		if(isset($wxresult['errcode'])){
			throw new Exception($wxresult['errmsg'], 1);
		}
		$token = Token::instance()->generateToken();
		// $wxresult['openid']=12389456;
		$this->grantToken($wxresult,$token);
		return $token;
	}

	public function grantToken($wxresult,$token){
		$openid = $wxresult['openid'];
		$user = model('User')->where(['openid'=>$openid])->find();
		if(empty($user)){
			$user = model('User');
			$user->save(['openid'=>$openid]);
		}
		$uid = $user->id;
		$cacheValue = $this->buildCacheValue($wxresult,$uid);
		
		$rel = Cache::set($token,$cacheValue,7200);
		if(!$rel){
			throw new Exception();
		}
	}

	/**
	 * 拼接用户信息缓存的值
	 * @param  [type] $wxresult [description]
	 * @param  [type] $uid      [description]
	 * @return [type]           [description]
	 * scope 权限等级
	 */
	public function buildCacheValue($wxresult,$uid){
		$cacheValue = $wxresult;
		$cacheValue['uid'] = $uid;
		$cacheValue['scope'] = 16; 
		return $cacheValue;
	}


}