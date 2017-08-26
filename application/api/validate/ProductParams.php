<?php 
namespace app\api\validate;
class ProductParams extends BaseValidate{
	protected $rule = [
		'name'=>'require',
		'price'=>'require|number|min:0',
		'stock'=>'require|integer|isPostiveInt',
		'category_id'=>'isPostiveInt',
		'from'=>'require|in:1,2'
	];

	protected $message = [
		'name.require'=>'商品名称不能为空',
		'price.require'=>'商品价格不能为空',
		'price.number'=>'商品价格非法',
		'price.min'=>'商品价格不能为负',
		'stock.require'=>'商品库存不能为空',
		'stock.integer'=>'商品库存非法',
		'stock.isPostiveInt'=>'库存不能为负',
		'from'=>'来源非法'
	];
}