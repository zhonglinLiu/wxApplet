<?php 
namespace app\api\model;

class UserAddress extends Base{
	
	public function getAddressByUser($uid){
		return $this->where(['user_id'=>$uid])->find();
	}

}