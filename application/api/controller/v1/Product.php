<?php 
namespace app\api\controller\v1;

use think\Controller;
use app\api\validate\Count;
use app\lib\exception\BaseException;
use app\api\validate\IdMustBePostiveInt;
class Product extends Controller{
	/**
	 * [getRecent 最近新品
	 * api/v1/products/recent?count=2
	 * @param  integer $count [description]
	 * @return [type]         [商品]
	 */
	public function getRecent($count=15){
		(new Count())->gocheck();
		$products = model('Product')->getRecentPro($count);
		if($products->isEmpty()){
			throw new BaseException('商品不存在',404);
		}
		return $products;
	}
	
	public function getAllInCategory($id=''){
		(new IdMustBePostiveInt)->gocheck();
		$products = model('Product')->getProductsByCateId($id);
		if($products->isEmpty()){
			throw new BaseException('商品不存在',404);
		}
		return $products;
	}

	/**
	 * [getOne 获取单个商品详情]
	 * @param  [type] $id [description]
	 * @return [type]     [description]
	 * api/v1/products/:id
	 */
	public function getOne($id){
		(new IdMustBePostiveInt)->gocheck();
		$product = model('Product')->getProductById($id);
		if(!$product){
			throw new BaseException("商品不存在", 404);
			
		}
		return $product;
	}


}