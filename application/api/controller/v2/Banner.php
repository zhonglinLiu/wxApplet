<?php 
namespace app\api\controller\v2;
use think\Controller;
class Banner extends Controller{
	public function getBanner($id){
		return json('ok');
	}
}