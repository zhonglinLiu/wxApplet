<?php 
namespace app\api\model;

class ProductImg extends Base{
	protected $hidden = [
		'id','product_id','delete_time'
	];
	public function imgUrl(){
		return $this->belongsTo('Img','img_id','id');
	}
}