<?php 
namespace app\api\model;
use think\Model;
use app\api\model\Base;
class Banner extends Base{

	public function items(){
		return $this->hasMany('BannerItem','banner_id','id');
	}

	public function getBannerById($id){
		$banner = self::with(['items','items.img'])->find($id);
		return $banner;
	}
}