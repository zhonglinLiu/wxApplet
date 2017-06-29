<?php 
namespace app\api\controller\v1;
use think\Controller;

class Category extends Controller{
	public function getAllCates(){
		$cates = model('Category')->getAllCates();
		return $cates;
	}
}