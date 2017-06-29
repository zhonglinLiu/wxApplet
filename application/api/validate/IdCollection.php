<?php 
namespace app\api\validate;
use app\api\validate\BaseValidate;

class IdCollection extends BaseValidate{
	protected $rule = [
		'ids'=>'checkIds'
	];

	protected $message = [
		'ids.required'=>'ids不存在',
		'ids.checkIds'=>'ids必须以逗号隔开'
	];

	protected function checkIds($value){
		$ids = explode(',',$value);
		if(empty($ids)){
			return false;
		}
		foreach ($ids as $id) {
			if(!$this->isPostiveInt($id)){
				$this->message('id','id必须为正整数');
				return false;
			}
			return true;
		}

	}

}