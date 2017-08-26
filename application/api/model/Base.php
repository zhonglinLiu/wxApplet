<?php 
namespace app\api\model;

use think\Model;

class Base extends Model{
	protected static $img_prefix=null;
	protected $autoWriteTimestamp = true;
	protected static function init(){
		if(is_null(self::$img_prefix)){
			self::$img_prefix = config('setter.img_prefix');
		}
		
	}
	protected function getFullUrl($url,$data){
		if($data['from']==1){
			$url = self::$img_prefix.$url;
		}
		return $url;
	}
}