<?php 
namespace app\api\model;
use think\Model;
use app\api\model\Base;
use app\lib\exception\BaseException;
class Theme extends Base{
	protected $hidden = [
		'topic_img_id','head_img_id','delete_time'
	];
	public function topicImg(){
		return $this->belongsTo('Img','topic_img_id','id');
	}
	public function headImg(){
		return $this->belongsTo('Img','head_img_id','id');
	}

	public function products(){
		return $this->belongsToMany('Product','theme_product','product_id','theme_id');
	}
	public function getThemeById($id){
		$theme = self::with('products,topicImg,headImg')->find($id);
		if(empty($theme)){
			throw new BaseException('主题不存在',404);
		}
		return $theme;
	}
}