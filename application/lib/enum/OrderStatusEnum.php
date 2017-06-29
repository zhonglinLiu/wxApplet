<?php 
namespace app\lib\enum;
class OrderStatusEnum{
	const UNPAY = 1; //未支付
	const PAYED = 2; //已支付
	const DELIVERED=3; //已发货
	const PAYED_BUT_OUT_OF=4; //已支付但无货
}