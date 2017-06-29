<?php
namespace app\api\controller\v1;

use think\Controller;
use app\api\validate\IdCollection;
use app\api\validate\IdMustBePostiveInt;
use app\api\model\Theme as ThemeModel;
use app\lib\exception\BaseException;
class Theme extends Controller{
	public function getThemes($ids=''){
		(new IdCollection)->goCheck();
		if(empty($ids)){
			$themes = ThemeModel::with('topicImg,headImg')->select();
		}else{
			$ids = explode(',', $ids);
			$themes = ThemeModel::with('topicImg,headImg')->select($ids);
		}
		if($themes->isEmpty()){
			throw new BaseException('内容为空');
		}
		return $themes;
	}

	public function getTheme($id){
		(new IdMustBePostiveInt())->goCheck();
		$theme = model('Theme')->getThemeById($id);
		return $theme;
	}
}