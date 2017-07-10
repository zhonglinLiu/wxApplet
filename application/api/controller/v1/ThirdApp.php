<?php 
namespace app\api\controller\v1;
use app\api\controller\Base;
use app\api\validate\Login;
use app\api\service\AppToken;
use app\api\model\ThirdApp as AppModel;
use app\lib\exception\BaseException;
class ThirdApp extends Base{
	public function getToken(){
		header('Access-Control-Allow-Origin: *');
		(new Login)->goCheck();
		$app_id = input('post.username');
		$app_se = input('post.password');
		$appM = new AppModel;
		$app = $appM->getUserByAppId($app_id);
		if(!$app){
			throw new BaseException('用户名错误',401,40002);
		}
		if(md5($app_se)!=$app->app_secret){
			throw new BaseException('密码错误',401,40003);
		}
		$appToken = new AppToken($app);
		$token = $appToken->get();
		if(!$token){
			throw new BaseException('token创建失败',500,50001);
		}
		return ['token'=>$token];

	}
}