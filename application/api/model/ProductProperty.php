<?php 
namespace app\api\model;

class ProductProperty extends Base{
	protected $createTime = false;
	/**
	 * [setPropertys description]
	 * @param [array] $data = [
	 *   ['name'=>'','detail'=>''],
	 *   ...
	 * ]
	 */
	public function setPropertys($data){
		if(isset($data['id'])){
			$id = $data['id'];
			unset($data['id']);
			if($this->save($data,['id'=>$id,'product_id'=>$data['product_id']])){
				return true;
			}
			return false;
		}else{
			if($this->isUpdate(false)->save($data)){
				return true;
			}
			return false;
		}
		
	}


}