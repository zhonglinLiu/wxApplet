<?php 
namespace app\api\service;
use WxPay\WxPayNotify;
use app\lib\enum\OrderStatusEnum;
use think\Log;
use think\Db;
class WxNotify extends WxPayNotify{
	public function NotifyProcess($data, &$msg){
		//1 判断成功失败
		//判断order->status 支付状态
		//2 判断库存
		//3 减少库存
		if($data['return_code']=='SUCCESS'){
			$orderNo = $data['out_trade_no'];
			Db::startTrans();
			try {
				$order = model('Order')->where(['order_no'=>$orderNo])->find();
				if($order->status==1){
					$pStatus = Order::instance()->checkOrderStock($orderNo);
					if($pStatus['pass']){
						$this->decStock($pStatus);
						$this->changeOrderStatus($orderNo,true);
					}else{
						$this->changeOrderStatus($orderNo,false);
					}
				}
				Db::commit();
					
			} catch (\Exception $e) {
				Db::rollback();
				Log::record($e->getMessage(),'error');
				return false;
			}		
		}
		else{
			return false;
		}
		
	}

	public function decStock($pStatus){
		foreach ($pStatus as $k => $v) {
			model('Product')->where(['id'=>$v['id']])->setDec('stock',$v['count']);
		}
	}

	public function changeOrderStatus($orderNo,$status){
		$OrderStatus = $status ? OrderStatusEnum::PAYED : OrderStatusEnum::PAYED_BUT_OUT_OF;
		model('Order')->where('id',$orderNo)->update(['status'],$OrderStatus);
	}
}