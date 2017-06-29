<?php 
namespace app\api\service;
use app\api\model\Order;
use app\lib\exception\BaseException;
use app\api\service\Token;
use app\lib\exception\ForbiddenException;
use app\lib\enum\OrderStatusEnum;
use app\api\service\Order as OrderService;
use WxPay\PlaceOrder;
use app\lib\exception\ServerException;
class Pay{
	private $orderId;
	private $orderNo;

	public function __construct($id){
		if(empty($id)){
			throw BaseException('订单id不能为空',400,60004);
		}
		$this->orderId = $id;
	}

	public function pay(){
		//订单是否存在
		//订单是否为本人
		//订单是否有库存
		//订单已支付
		$order = (new Order)->getOrderByid($this->orderId);
		if(empty($order)){
			throw new BaseException('订单不存在',404,60003);
		}
		$this->orderNo = $order->order_no;
		$uid = $order->user_id;
		if(!Token::instance()->checkUserIsSelf($uid)){
			throw new ForbiddenException;
		}

		if($order->status!=OrderStatusEnum::UNPAY){
			throw new BaseException('订单已支付',400,60005);
		}

		$status = OrderService::instance()->checkOrderStock($this->orderId);
		if(!$status['pass']){
			return $status;
		}

		//调用微信统一下单接口
		$opts = [
			'body'=>'test',
			'trade_no'=> $this->orderNo,
			'total_fee' => $order->total_price,
			'api'=>'JSAPI',
			'openid'=>Token::instance()->getCurrentTokenVal('openid'),
			'notify_url'=>'http://baidu.com'
		];
		$resOrder = PlaceOrder::makeProOrder($opts);
		// $this->savePrepayId($resOrder['prepay_id']);
		return $resOrder;

	}

}