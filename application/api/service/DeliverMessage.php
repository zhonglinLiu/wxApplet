<?php 
namespace app\api\service;
use app\lib\enum\OrderStatusEnum;
use app\lib\exception\BaseException;
use app\api\model\User;
class DeliverMessage extends wxMessage{
	public function __construct($order,$token){

		$this->url = sprintf($this->url,$token);
		$this->buildData($order);
	}

	protected function buildData($order){
		if($order->status != OrderStatusEnum::PAYED){
			throw new BaseException('定单状态必须为已付款',400,40003);
		}
		$data = [
			'touser'=> User::get($order->user_id)->openid,
			'template_id'=>config('wx.deliverAccessToken'),
			'page'=>'pages/my/my',
			'form_id'=>$order->prepay_id,
			'data'=>[
				'keyword1'=>'xxx',
				'keyword2'=>$order->create_time,
				'keyword3'=>$order->snap_name,
				'keyword4'=>$order->order_no
			],
		];
		$this->data = json_encode($data);
		$order->status = OrderStatusEnum::DELIVERED;
	}
}