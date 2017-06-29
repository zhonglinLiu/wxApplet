<?php 
namespace app\api\validate;
use think\Validate;
use app\api\validate\BaseValidate;
class IdMustBePostiveInt extends BaseValidate{
	protected $rule = [
		'id'=>'require|isPostiveInt',
	];
	
	protected $message = [
		'id.require'=>'id不存在',
		'id.isPostiveInt'=>'id必须为整数',
	];

}