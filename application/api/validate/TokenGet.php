<?php 
namespace app\api\validate;
use app\api\validate\BaseValidate;

class TokenGet extends BaseValidate{
	protected $rule = [
		'code'=>'require|isNotEmpty'
	];

	protected $message = [
		'code.isNotEmpty'=>'code不能为空',
		'code.require'=>'code不存在'
	];

	
}