<?php 
namespace app\api\controller;
use think\Controller;
use app\api\service\Token;
class Base extends Controller{
	/**
	 * [checkUserScope 权限大于用户的都可以访问]
	 * @return [type] [description]
	 */
	public function checkUserScope(){
		Token::instance()->checkUserScope();

	}
	/**
	 * [onlyUserScope 权限为用户的可以访问]
	 * @return [type] [description]
	 */
	public function onlyUserScope(){
		Token::instance()->onlyUserScope();
	}
}