<?php 
namespace app\api\controller\v1;
use think\Controller;
use think\Validate;
use think\Exception;
use app\lib\exception\BannerException;
class Banner extends Controller{
	public function getBanner($id){
		validate('IdMustBePostiveInt')->goCheck();
		$banner = model('Banner')->getBannerById($id);
		if(empty($banner)){
			throw new BannerException;
		}
		return $banner;
	}
}