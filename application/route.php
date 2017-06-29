<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

/*return [
    '__pattern__' => [
        'name' => '\w+',
    ],
    '[hello]'     => [
        ':id'   => ['index/hello', ['method' => 'get'], ['id' => '\d+']],
        ':name' => ['index/hello', ['method' => 'post']],
    ],

];*/
use think\Route;
//获取首页栏位
Route::get('api/:version/banner/:id','api/:version.Banner/getBanner');

//获取主题
Route::get('api/:version/themes','api/:version.Theme/getThemes');
Route::get('api/:version/themes/:id','api/:version.Theme/getTheme');

//获取一个商品信息
Route::get('api/:version/products/recent','api/:version.Product/getRecent');
Route::get('api/:version/products/by_category','api/:version.Product/getAllInCategory');
Route::get('api/:version/products/:id','api/:version.Product/getOne',[],[':id'=>'\d+']);

//获取分类
Route::get('api/:version/category/all','api/:version.Category/getAllCates');

//获取token令牌
//api/v1/user/get_token
Route::post('api/:version/user/get_token','api/:version.User/getToken');

//创建或改变地址
Route::post('api/:version/address','api/:version.UserAddress/changeOrCreate');

//提交订单
/*$products = [
	'product_id'=>1,
	'id'=>3
];*/
Route::post('api/:version/order','api/:version.Order/checkOrder');

//api/v1/user_orders?page=1&size=10
Route::post('api/:version/user_orders','api/:version.Order/getOrders');

//预订单
//$id = order_id
Route::post('api/:version/pay/proPay','api/:version.Pay/prePay');

//微信回调
Route::any('api/:version/pay/notify','api/:version.Pay/receiveNotify');
