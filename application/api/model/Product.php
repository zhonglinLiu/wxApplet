<?php 
namespace app\api\model;
use think\Model;
use app\api\model\Base;
use app\lib\exception\BaseException;
class Product extends Base{
	protected $hidden = [
		'pivot','category_id','from','create_time','update_time','img_id'
	];

	public function getMainImgUrlAttr($value){
		return config('setter.img_prefix').$value;
	}
	
	public function getRecentPro($count){
		$products = $this->limit($count)->order('create_time','desc')->select();
		
		return $products;
	}

	public function imgs(){
		return $this->hasMany('ProductImg','product_id','id');
	}

	public function properties(){
		return $this->hasMany('ProductProperty','product_id','id');
	}

	public function getProductsByCateId($id){
		$products = $this->all(['category_id'=>$id]);
		return $products;
	}

	public function getProductById($id){
		return self::with([
			'imgs'=>function($query){
				$query->with('imgUrl')->order('order','asc');
			}
		])->with(['properties'])->where(['id'=>$id])->find();
	}
}