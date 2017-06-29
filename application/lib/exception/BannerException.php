<?php 
namespace app\lib\exception;
use app\lib\exception\BaseException;

class BannerException extends BaseException{
	public $code=400;
	public $msg='banner请求错误';
	public $errorCode='40000';
	
}