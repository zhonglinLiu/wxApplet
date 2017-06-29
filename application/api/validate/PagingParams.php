<?php 
namespace app\api\validate;

class PagingParams extends BaseValidate{
	protected $rule = [
		'page' => 'isPostiveInt',
		'size' => 'isPostiveInt'
	];

	protected $message = [
		'page.isPostiveInt'=>'page必须为正整数',
		'size.isPostiveInt'=>'page必须为正整数',
	];
	
}