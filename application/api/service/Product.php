<?php 
namespace app\api\service;
use app\api\model\Img;
use app\api\model\ProductImg;
use think\Db;
class Product{
	public function addProductImgs($imgs,$pid){
		Db::startTrans();
		try {
			$imgsDetail = (new Img)->addImages($imgs);
			$imgsId = [];
			foreach ($imgsDetail as $v) {
				$imgsId[] = $v['id'];
			}
			$rel = (new ProductImg)->addImgsId($imgsId,$pid);
			Db::commit();
		} catch (\Exception $e) {
			Db::rollback();
			throw new \Exception($e->getMessage(),500);
		}
			
		if(!$rel){
			return false;
		}
		return true;
	}
}