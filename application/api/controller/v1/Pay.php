<?php 
namespace app\api\controller\v1;
use think\Controller;
use app\api\validate\IdMustBePostiveInt;
use app\api\controller\Base;
use app\api\service\Pay as PayService;
use app\api\service\WxNotify;
class Pay extends Base{
	protected $beforeActionList = [
		'onlyUserScope' => ['prePay']
	];
	public function prePay($id=''){
		(new IdMustBePostiveInt())->goCheck();
		$pay = new PayService($id);
		return $pay->pay();
	}

	/**
	 * 微信异步通知
	 * @return [type] [description]
	 */
	public function receiveNotify(){
		//通知频率15/15/30/180/1800/1800/1800/1800/3600
		//1 检查库存
		//2 修改订单状态
		//3 减库存
		//4 
		
		// 特点 post， xml格式
		$wxNotify = new WxNotify;
		return $wxNotify->Handle();
		
	}
}