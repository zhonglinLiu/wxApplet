<?php 
namespace app\api\model;
use app\api\model\Base;
use think\Cache;
class User extends Base{
	protected $autoWriteTimestamp = true;
	protected $createTime = 'create_time';
	protected $updateTime = false;
	protected $type = [
		'create_time'=>'timestamp:Y-m-d h:i:s',
		'delete_time'=>'timestamp:Y-m-d h:i:s'
	];

	public function address(){
		return $this->hasOne('UserAddress','user_id','id');
	}

	public function userExists($id){
		return $this->field(['id'])->where(['id'=>$id])->find();
	}
}