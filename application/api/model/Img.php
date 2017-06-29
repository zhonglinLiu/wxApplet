<?php 
namespace app\api\model;
use think\Model;
use app\api\model\Base;
class Img extends Base{
	public $hidden = ['id','from','delete_time','update_time'];
	protected function getUrlAttr($value,$data){
		return $this->getFullUrl($value,$data);
	}
}