<?php 
namespace app\lib\exception;

class TokenException extends BaseException{
	public $code=400;
	public $msg='token错误或过期';
	public $errorCode=40001;
}