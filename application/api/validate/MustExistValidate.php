<?php 
namespace app\api\validate;
use app\api\validate\BaseValidate;
class MustExistValidate extends BaseValidate{
	protected $rule = [];
	protected $message = [];
	public function __construct($params){
		if(is_array($params)){
			$len = count($params);
			for($i=0 ; $i<$len ; $i++){
				$this->rule[$params[$i]] = 'require';
				$this->message["{$params[$i]}.require"] = $params[$i].'不能为空';
			}
		}
		else{
			$this->rule = [
				"{$params}" => 'require'
			];
			$this->message["{$params}.require"] = $params.'不能为空';
		}
		
	}
}