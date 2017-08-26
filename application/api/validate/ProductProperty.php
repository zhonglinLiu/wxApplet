<?php 
namespace app\api\validate;
use app\lib\exception\BaseException;
class ProductProperty extends BaseValidate{
	protected $singleRule = [
		'id'=>'isPostiveInt',
		'name'=>'require',
		'detail'=>'require',
		'product_id'=>'require|isPostiveInt',
	];
	protected $rule = [
		'propertys'=>'require|checkProperty'
	];
	protected $message = [
		'id.isPostiveInt'=>'id非法',
		'name.require'=>'商品属性不能为空',
		'detail.require'=>'请填写属性详情',
		'product_id.require'=>'商品属性不能为空',
		// 'data.checkProperty'=>'商品属性非法'
	];

	protected function checkProperty($value,$rule='',$data='',$field=''){
		if(!is_array($value)){
			throw new BaseException("数据非法",400);
		}
		$validate = new BaseValidate($this->singleRule,$this->message);
		foreach ($value as $v) {
			if(!$validate->check($v)){
				throw new BaseException($validate->getError(),400);
			}
		}
		return true;
	}
}