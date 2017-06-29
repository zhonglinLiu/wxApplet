<?php 
namespace app\api\model;
use think\Model;
use app\api\model\Base;
class BannerItem extends Base{

	public $hidden = ['img_id','delete_time','update_time','banner_id'];
	public function img(){
		// return $this->hasOne();
		return $this->belongsTo('img','img_id','id');
	}
	

}