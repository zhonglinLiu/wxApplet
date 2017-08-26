<?php 
namespace app\api\controller\v1;

use think\Controller;
use app\api\validate\Count;
use app\lib\exception\BaseException;
use app\api\validate\IdMustBePostiveInt;
use app\api\validate\PagingParams;
use app\api\validate\ProductParams;
use app\api\service\Product as ProductService;
use app\api\validate\UrlValidate;
use app\api\validate\MustExistValidate;
use app\api\model\ProductProperty;
use app\api\validate\ProductProperty as ProductPropertyValidate;
use think\Db;
class Product extends Controller{
	/**
	 * [getRecent 最近新品
	 * api/v1/products/recent?count=2
	 * @param  integer $count [description]
	 * @return [type]         [商品]
	 */
	public function getRecent($count=15){
		(new Count())->goCheck();
		$products = model('Product')->getRecentPro($count);
		if($products->isEmpty()){
			throw new BaseException('商品不存在',404);
		}
		return $products;
	}
	
	public function getAllInCategory($id=''){
		(new IdMustBePostiveInt)->goCheck();
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
		(new IdMustBePostiveInt)->goCheck();
		$product = model('Product')->getProductById($id);
		if(!$product){
			throw new BaseException("商品不存在", 404);
			
		}
		return $product;
	}

	public function getProdyctByPage(){
		(new PagingParams)->goCheck();
		$page = input('get.page');
		$size = input('get.size');
		$products = model('Product')->getProductByPage($page,$size);
		return $products;
	}

	public function getTotalCount(){
		$count = model('Product')->count();
		return ['count'=>$count];
	}

	public function addProduct(){
		(new ProductParams)->goCheck();
		$data = input('post.');
		$img = model('Img');
		$retData = [];
		Db::startTrans();
		try {
			if(isset($data['main_img_url']) && $data['main_img_url'] !=''){
				$img->data(['url'=>$data['main_img_url'],'from'=>$data['from']])->save();
			}
			if(isset($data['id']) && $data['id'] != ''){
				$id = $data['id'];
				unset($data['id']);
				$product = model('Product')->allowField(true)->save($data,['id'=>$id]);
			}else{
				$product = model('Product')->allowField(true)->data($data)->save();
				$retData['product_id'] = $product->id;
			}
			Db::commit();
			return json(array_merge(['msg'=>'操作成功'],$retData));
		} catch (\Exception $e) {
			Db::rollback();
			return json(['msg'=>'操作失败',500]);
		}
			
	}

	public function addImage(){
		(new IdMustBePostiveInt)->goCheck();
		(new UrlValidate('imgs'))->goCheck();
		$data = input('post.');
		$pid = $data['id'];
		$imgs = $data['imgs'];
		$product = model('Product')->get($pid);
		if(!$product){
			return json(['code'=>400,'msg'=>'商品不存在'],400);
		}
		if( (new ProductService)->addProductImgs($imgs,$pid) ){
			return json(['code'=>200,'msg'=>'商品图片添加成功']);
		}
		return json(['code'=>500,'msg'=>'商品图片添加失败']);
	}

	public function addProperty(){
		(new ProductPropertyValidate)->goCheck();
		$data = input('post.')['propertys'];
		Db::startTrans();
		try {
			foreach ($data as $v) {
				model('ProductProperty')->setPropertys($v);
			}
			Db::commit();
		} catch (\Exception $e) {
			Db::rollback();
			return json(['code'=>500,'msg'=>'商品属性操作失败'],500);
		}
			
		return json(['code'=>200,'msg'=>'商品属性操作成功']);
	}

	public function getProperty(){
		(new IdMustBePostiveInt)->goCheck();
		$id = input('get.id');
		$rel = model('ProductProperty')->where(['product_id'=>$id])->select()->hidden(['delete_time','update_time']);
		return $rel;
	}

	public function delProperty(){
		(new IdMustBePostiveInt(['product_id','id']))->goCheck();
		$product_id = input('post.product_id');
		$id = input('post.id');
		if(model('ProductProperty')->where(['id'=>$id,'product_id'=>$product_id])->delete()){
			return json(['code'=>200,'msg'=>'商品属性删除成功']);
		}
		return json(['code'=>500,'msg'=>'商品属性删除失败']);
	}

	public function getImgs(){
		(new IdMustBePostiveInt('product_id'))->goCheck();
		$product_id = input('get.product_id');
		$imgs = model('ProductImg')->where(['product_id'=>$product_id])->order('order','asc')->with('imgUrl')->select();
		return $imgs;
	}

	public function imgOrder(){
		(new IdMustBePostiveInt(['id','order']))->goCheck();
		$order = input('post.order');
		$id = input('post.id');
		$rel = model('ProductImg')->save(['order'=>$order],['id'=>$id]);
		if($rel){
			return json(['code'=>200,'msg'=>'排序修改成功']);
		}
		return json(['code'=>50001,'msg'=>'排序修改失败'],500);
	}

}