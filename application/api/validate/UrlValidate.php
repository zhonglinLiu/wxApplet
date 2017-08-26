<?php 
namespace app\api\validate;
use app\api\validate\BaseValidate;
class UrlValidate extends BaseValidate{
	protected $name;
	protected $rule = [
		
	];

	protected $message = [
		
	];
	public function __construct($name = 'url'){
		$this->name = $name;
		$this->rule = [
			"{$this->name}"=>'checkUrls|require'
		];
		$this->message = [
			"{$this->name}.checkUrls"=>'非法url'
		];
	}


	protected function checkUrls($value,$rule='',$data='',$field=''){
		if(!is_array($value)){
			return $this->checkUrl($value);
		}
		foreach ($value as $v) {
			if(!$this->checkUrl($v)){
				return false ;
			}
		}
		return true;
	}

	protected function checkUrl($value){
		$preg = "/^[a-zA-Z0-9_\/]+\/+[a-zA-Z0-9_.]+[a-zA-Z0-9]$/";
		if(!preg_match($preg,$value)){
			return false;
		}
		return true;
	}
}