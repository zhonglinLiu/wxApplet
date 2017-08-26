<?php 
namespace app\api\validate;
use think\Validate;
use app\api\validate\BaseValidate;
class IdMustBePostiveInt extends BaseValidate{
	protected $rule = [
		// 'id'=>'require|isPostiveInt',
	];
	
	protected $message = [
		/*'id.require'=>'id不存在',
		'id.isPostiveInt'=>'id必须为整数',*/
	];
	public function __construct($name='id'){
		if(is_array($name)){
			foreach ($name as $v) {
				$this->rule[$v] = 'require|isPostiveInt';
				$this->message["{$v}.require"] = "{$v}不存在";
				$this->message["{$v}.isPostiveInt"] = "{$v}必须为正整数";
			}
		}else{
			$this->rule = [
				"{$name}"=>'require|isPostiveInt'
			];
			$this->message = [
				"{$name}.require"=>"{$name}不存在",
				"{$name}.isPostiveInt"=>"{$name}必须为正整数",
			];
		}
	}

}