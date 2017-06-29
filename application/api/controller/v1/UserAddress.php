<?php 
namespace app\api\controller\v1;
use think\Controller;
use app\api\service\Token;
use app\lib\exception\BaseException;
use app\api\service\UserToken;
use app\lib\enum\ScopeEnum;
use app\lib\exception\ForbiddenException;
use app\lib\exception\TokenException;
use app\api\controller\Base;
class UserAddress extends Base{

	protected $beforeActionList = [
		'checkUserScope'=>['only'=>'changeOrCreate']
	];

	
	public function changeOrCreate(){
		validate('UserAddress')->goCheck();
		$post = input('post.');
		$uid = Token::instance()->getCurrentUid();
		if(!$uid){
			throw new TokenException;
		}
		validate('UserAddress')->checkRequestData($post);
		if(!model('User')->userExists($uid)){
			throw new BaseException('该用户不存在',400);
		}
		$user = model('User')->get($uid);
		$address = $user->address;
		
		if(empty($address)){
			$user->address()->save($post);
		}else{
			$user->address->save($post);
		}
		throw new BaseException('success',200,10001);
	}

}