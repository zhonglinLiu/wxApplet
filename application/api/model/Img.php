<?php 
namespace app\api\model;
use think\Model;
use app\api\model\Base;
class Img extends Base{
	protected $createTime  = false;
	public $hidden = ['id','from','delete_time','update_time'];
	protected function getUrlAttr($value,$data){
		return $this->getFullUrl($value,$data);
	}

	public function addImages($imgs){
		if(!is_array($imgs)){
			$this->data(['url'=>$imgs])->save();
			return $this->id;
		}else{
			$maxId = $this->order('id desc')->limit(1)->find()->id;
			$data = [];
			foreach ($imgs as $v) {
				$data[] = [
					'id'=>++$maxId,
					'url'=>$v
				];
			}
			if($this->saveAll($data,false)){
				return $data;
			}
			return false;
		}
	}
}