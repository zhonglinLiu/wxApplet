<?php 
namespace app\api\validate;
use app\lib\exception\BaseException;
class Order extends BaseValidate{
	protected $rule = [
		'products'=>'require|checkProducts'
	];

	protected $singleRule = [
		'product_id'=>'require|isPostiveInt',
		'count'=>'require|isPostiveInt'
	];

	protected function checkProducts($value,$rule='',$data='',$field=''){
		if(!is_array($value)){
			throw new BaseException('订单参数非法',400,40001);
		}
		foreach ($value as $v) {
			$this->checkProduct($v);
		}
		return true;
	}

	protected function checkProduct($value,$rule='',$data='',$field=''){
		$validate = new BaseValidate($this->singleRule);
		if(!$validate->check($value)){
			throw new BaseException('订单参数非法',400,40001);
		}
		return true;
	}

}