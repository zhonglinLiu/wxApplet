<?php 
namespace app\api\service;
use think\Exception;
use app\lib\exception\BaseException;
class wxMessage{
	protected $url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=%s';
	protected $data;
	public function sendMessage(){
		$rel = (array)json_decode(doCurl($this->url,'POST',$this->data));
		if($rel && $rel['errcode']==0){
			return true;
		}
		return false;
	}
}