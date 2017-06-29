<?php 
namespace WxPay;
use think\Log;
use app\lib\exception\ServerException;
require_once 'WxPay.Api.php';

class PlaceOrder{

	/**
	 * 统一下单
	 * @param  [type] $opts [description]
	 * @return [type]       [description]
	 */
	public static function makeProOrder($opts){
		$order = new \WxPayUnifiedOrder();
		$order->SetBody($opts['body']);
		$order->SetOut_trade_no($opts['trade_no']);
		$order->SetTotal_fee($opts['total_fee']*100);
		$order->SetTrade_type($opts['api']);
		$order->SetOpenid($opts['openid']);
		$order->SetNotify_url($opts['notify_url']);
		return self::getProPayRes($order);
	}

	public static function getProPayRes($payObj){
		$pay = new \WxPayApi();
		$orderRel = $pay::unifiedOrder($payObj);
		if($orderRel['return_code']!='SUCCESS' || $orderRel['result_code']!='SUCCESS'){
			Log::record($orderRel,'error');
			Log::record('获取预订单失败','error');
			return $orderRel;
		}
		self::savePrepayId($orderRel['prepay_id']);
		return self::sign($orderRel);
		//....
	}

	//签名并将结果返回给微信小程序拉起支付所需要的信息
	public static function sign($orderRel){
		$WxPayJsApiPay = new \WxPayJsApiPay;
		$WxPayJsApiPay->SetAppid(config('wx.appid'));
		$WxPayJsApiPay->SetTimeStamp((string)time());
		$nonce = md5(time().mt_rand(0,9999));
		$WxPayJsApiPay->SetNonceStr($nonce);
		$WxPayJsApiPay->SetPackage('prepay_id='.$orderRel['prepay_id']);
		$WxPayJsApiPay->SetSignType('md5');
		$sign = $WxPayJsApiPay->MakeSign();
		$WxPayJsApiPay->SetPaySign($sign);
		$wxValues = $WxPayJsApiPay->GetValues();
		unset($wxValues['appId']);
		return $wxValues;
	}

	/**
	 * 保存prepay_id
	 * @param  [type] $prepay_id [description]
	 * @return [type]            [description]
	 */
	protected static function savePrepayId($prepay_id){
		$rel = Order::where(['id'=>$this->orderId])->update(['prepay_id'=>$prepay_id]);
		if(empty($rel)){
			throw new ServerException;
		}
	}

	


}