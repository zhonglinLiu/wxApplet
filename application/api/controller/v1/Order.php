<?php
namespace app\api\controller\v1;
use app\api\controller\Base;
use app\api\validate\Order as OrderValidate;
use app\api\service\Order as OrderService;
use app\api\model\Order as OrderModel;
use app\api\validate\PagingParams;
use app\api\service\Token;
use app\api\validate\IdMustBePostiveInt;
use app\lib\exception\BaseException;
class Order extends Base{
	//用户在下单时会把商品的详细信息发送到后台
	//后台检查商品是否有货
	//有库存，写入order表，通知客户端可以支付
	//调用支付接口支付
	//在次检查库存量
	//服务器调用统一微信支付接口，进行支付
	//向小程序返回参数
	//小程序拉起微信支付
	//微信会返回给客服端支付结果
	//微信异步通知服务器
	//成功： 再次检查库存量
	//成功：减少库存
	protected $beforeActionList = [
		'onlyUserScope'=>['only'=>'checkOrder'],
		'checkUserScope'=>['only' => 'getOrders,getDetail']
	];

	public function checkOrder(){
		(new OrderValidate)->goCheck();
		$OrderService = OrderService::instance();
		$oproducts = input('post.')['products'];
		$status = $OrderService->makeOrder($oproducts);
		return $status;
	}

	/**
	 * 获取订单信息
	 * @param  integer $page [当前页]
	 * @param  integer $size [显示的order数]
	 * @return [type]        [description]
	 * api/v1/user_orders?page=1&size=10
	 */
	public function getOrders($page=1,$size=10){
		(new PagingParams)->goCheck();
		$uid = Token::instance()->getCurrentTokenVal('uid');
		$pageObj = (new OrderModel)->getOrdersByPage($page,$size,$uid);
		if($pageObj->isEmpty()){
			return [
				'data' => [],
				'current_page' =>$pageObj->currentPage()
			];
		}
		else
		{
			return [
				'data' => $pageObj->hidden(['prepay_id','snap_address','snap_items','delete_time'])->toArray(),
				'current_page' =>$pageObj->currentPage()
			];
		}
	}

	public function getDetail($id){
		(new IdMustBePostiveInt)->goCheck();
		$order = OrderModel::get($id);
		if(!$order){
			throw new BaseException('订单不存在',404,60003);
		}
		return $order->hidden(['prepay_id']);
	}


}