<?php 
namespace app\api\validate;

class UserAddress extends BaseValidate{
	protected $rule = [
		'name'=>'require',
		'mobile'=>'require',
		'province'=>'require',
		'city'=>'require',
		'country'=>'require',
		'detail'=>'require',
	];

	protected $message = [
		'name.require'=>'名字不能为空',
		'mobile.require'=>'电话不能为空',
		'province.require'=>'省份不能为空',
		'city.require'=>'城市不能为空',
		'country.require'=>'国家不能为空',
		'detail.require'=>'详细地址不能为空',
	];
}