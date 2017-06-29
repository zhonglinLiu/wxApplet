<?php 
namespace app\api\model;
use app\api\model\Base;

class Category extends Base{
	protected $hidden = ['delete_time','update_time'];
	public function img(){
		return $this->belongsTo('Img','topic_img_id','id');
	}
	public function getAllCates(){
		return $this->all([],'img');
	}
}