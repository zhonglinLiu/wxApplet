<?php 
namespace app\api\service;
use app\api\model\Product;
use app\api\model\Order as OrderModel;
use app\api\model\OrderProduct;
use app\lib\exception\BaseException;
use think\Db;
class Order{
	protected static $ins = null;
	//查询出来的商品
	protected $products;
	//订单中的上商品
	protected $oproducts;
	protected $uid;
	/**
	 * 检测库存
	 * @param  [type] $oproducts [description]
	 * @return [type]            [description]
	 */
	public static function instance(){
		if(is_null(self::$ins)){
			self::$ins = new self;
		}
		return self::$ins;
	}
	/**
	 * 创建order主方法
	 * @param  [type] $oproducts [description]
	 * @return [type]            [description]
	 */
	public function makeOrder($oproducts){
		$this->oproducts = $oproducts;
		$this->uid = Token::instance()->getCurrentTokenVal('uid');
		// $this->uid = 1;
		$this->products = $this->getProducts();
		$status = $this->getOrderStatus();
		if(!$status['pass']){
			return $status;
		}
		$snap = $this->buildOrderSnap($status);
		return $this->createOrder($snap);
	}

	/**
	 * 将订单信息写入数据库
	 * @param  [type] $snap [description]
	 * @return [type]       [description]
	 */
	protected function createOrder($snap){
		$orderNo = self::buildOrderNo();
		$snap['order_no'] = $orderNo;
		try {

			Db::startTrans();
			$OrderModel = OrderModel::create($snap);
			$oid = $OrderModel->id;
			$create_time = $OrderModel->create_time;
			foreach ($this->oproducts as &$v) {
				$v['order_id'] = $oid;
			}
			$orderProductModel = model('OrderProduct');
			$orderProductModel->saveAll($this->oproducts);
			Db::commit();
		} catch (\Exception $e) {
			Db::rollback();
			throw new \Exception($e);
		}

		return [
			'order_no'=>$orderNo,
			'order_id'=>$oid,
			'create_time'=>$create_time,
			'pass'=>true
		];
	}

	public static function buildOrderNo(){
		$yCode = ['A','B','C','D','E','F','J','H','I','G'];
		$orderNo = $yCode[date('Y')-2017] . strtoupper(dechex(date('m'))) . date('d') . substr(time(),-5) . 
		substr(microtime(),2,5) . rand(10,99);
		return $orderNo;
	}

	/**
	 * 生成订单快照
	 * @param  [type] $status [description]
	 * @return [type]         [description]
	 */
	protected function buildOrderSnap($status){
		$snap = [
			'total_price'=>0,
			'user_id'=>0,
			'snap_img'=>'',
			'snap_name'=>'',
			'snap_items'=>'',
			'total_count'=>'',
			'snap_address'=>'',
		];
		$address = model('UserAddress')->getAddressByUser($this->uid);
		if(empty($address))
			throw new BaseException('用户收货地址不存在',400,60001);
		$snap['total_price'] = $status['orderPrice'];
		$snap['user_id'] = $this->uid;
		$snap['snap_img'] = $this->products[0]['main_img_url'];
		$snap['snap_name'] = $this->products[0]['name'];
		$snap['snap_items'] = json_encode($status['pStatusArray']);
		$snap['total_count'] = $status['total_count'];
		$snap['snap_address'] = json_encode($address);
		if(count($this->products)>1){
			$snap['snap_name'].='等';
		}
		return $snap;
	}



	/**
	 * 获取商品
	 * @return [type] [description]
	 */
	protected function getProducts(){
		$pro = [];
		foreach ($this->oproducts as $v) {
			array_push($pro,$v['product_id']);
		}
		return Product::all($pro)->visible(['id','name','price','stock','main_img_url'])->toArray();
	}
	/**
	 * 获取订单中商品的详情及状态
	 * @return [type] [description]
	 */
	public function getOrderStatus(){
		$status = [
			'pass'=>true,
			'orderPrice'=>0,
			'pStatusArray'=>[],
			'total_count'=>0,
		];
		$products = $this->reProducts();
		$orderPrice = 0;
		// var_dump($this->oproducts);exit;
		foreach ($this->oproducts as $v) {
			$pStatusArray = $this->getProductStatus($v['product_id'],$v['count'],$products);
			$orderPrice+=$pStatusArray['productPrice'];
			$status['total_count']+=$pStatusArray['count'];
			if(!$pStatusArray['hasStock'])
				$status['pass'] = false;
			array_push($status['pStatusArray'],$pStatusArray);
		}
		$status['orderPrice'] = $orderPrice;
		return $status;
	}
	/**
	 * 将商品数组的key变为id
	 * @return [type] [description]
	 */
	public function reProducts(){
		$products = [];
		for($i=0;$i<count($this->products);$i++){
			$products[$this->products[$i]['id']] = $this->products[$i];
		}
		return $products;
	}

	/**
	 * 获取商品信息及是否还有库存
	 * @param  [type] $oproduct [description]
	 * @param  [type] $ocount   [description]
	 * @param  [type] $products [description]
	 * @return [type]           [description]
	 */
	public function getProductStatus($oproduct_id,$ocount,$products){
		$pStatusArray = [];
		if(!isset($products[$oproduct_id])){
			throw new BaseException(json_encode([
				'product_id'=>$oproduct_id,
				'name'=>$products['name'],
				'msg'=>'商品不存在'
			]),404,40001);
		}
		$product = $products[$oproduct_id];
		$pStatusArray = [
			'id'=>$product['id'],
			'name'=>$product['name'],
			'productPrice'=>$ocount * $product['price'],
			'count'=>$ocount,
			'main_img_url'=>$product['main_img_url'],
		];
		$pStatusArray['hasStock'] = $product['stock'] >= $ocount ? true : false;
		return $pStatusArray;
	}

	/**
	 * 检查商品库存量
	 * @param  [type] $id [order_id]
	 * @return [type]     [array]
	 */
	public function checkOrderStock($id){
		$this->oproducts = model('OrderProduct')->where(['order_id'=>$id])->select();
		$this->products = $this->getProducts();
		$status = $this->getOrderStatus();
		return $status;
	}
} 