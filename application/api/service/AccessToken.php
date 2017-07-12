<?php 
namespace app\api\service;
use app\lib\exception\BaseException;
use think\Cache;
class AccessToken{
	protected $url;
	public function __construct(){
		$this->url = sprintf(config('wx.accessTokenUrl'),config('wx.appid'),config('wx.secret'));
	}
	public function get(){
		if(Cache::has('access_token')){
			return Cache::get('access_token');
		}
		$res = (array)json_decode(doCurl($this->url));
		if(!$res || isset($res['errcode'])){
			throw new BaseException('获取assessToken失败',500,50002);
		}
		if(Cache::set('access_token',$res['access_token'],7000)){
			return $res['access_token'];
		}
		return false;
	}
}