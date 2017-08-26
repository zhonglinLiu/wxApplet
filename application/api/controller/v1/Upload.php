<?php 
namespace app\api\controller\v1;
use app\api\controller\Base;
class Upload extends Base{
	public function image(){
		$file = request()->file('file');
		$info = $file->validate(['ext'=>'jpg,png,gif,jpeg'])->move(ROOT_PATH . 'public' . DS . 'images');
		if($info){
			$path = $info->getSaveName();
			$path = '/'.str_replace('\\','/',$path);
			return json(['path'=>$path,'code'=>'200']);	
		}
		return json(['error'=>$file->getError(),'code'=>'500'],500);
	}
}