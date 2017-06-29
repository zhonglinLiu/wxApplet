<?php 
namespace app\api\validate;
use app\api\validate\BaseValidate;

class Count extends BaseValidate{
	protected $rule = [
		'count'=>'isPostiveInt|between:1,15'
	];

	protected $message = [
		'count.isPostiveInt'=>'count必须为正整数',
		'count.between'=>'count必须大于0小于16'
	];

}