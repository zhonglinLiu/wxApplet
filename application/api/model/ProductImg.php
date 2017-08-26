<?php 
namespace app\api\model;

class ProductImg extends Base{
	protected $autoWriteTimestamp = false;
	protected $hidden = [
		'product_id','delete_time'
	];
	public function imgUrl(){
		return $this->belongsTo('Img','img_id','id');
	}

	public function addImgsId($imgsid,$pid){
		$maxId = $this->order('id desc')->limit(1)->find()->id;
		$data = [];
		$order = 1;
		foreach ($imgsid as $v) {
			$data[] = [
				'id'=>++$maxId,
				'img_id'=>$v,
				'product_id'=>$pid,
				'order'=>$order++
			];
		}
		return $this->saveAll($data,false);
	}
}