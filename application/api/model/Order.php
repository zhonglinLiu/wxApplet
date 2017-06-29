<?php 
namespace app\api\model;

class Order extends Base{
	protected $autoWriteTimestamp = true;

	public function getOrderByid($id){
		return $this->get($id);
	}

	public function getOrdersByPage($page,$size,$uid){
		$pageObj = $this->where('user_id', '=', $uid)
			->order('create_time','desc')
			->paginate($size,true,[
				'page' => $page
			]);

		return $pageObj;
	}
	public function getSnapItemsAttr($val){
		// var_dump(json_decode($val,true));
		return json_decode($val,true);
	}

	public function getSnapAddressAttr($val){
		return json_decode($val,true);
	}
	
	
}