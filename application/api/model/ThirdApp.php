<?php 
namespace app\api\model;
class ThirdApp extends Base{
	public function getUserByAppId($app_id){
		return $this->where(['app_id'=>$app_id])->find();
	}
}