<?php 
namespace app\lib\exception;

class ForbiddenException extends BaseException{
	public $code=403;
	public $msg='请求不被允许';
	public $errorCode=10001;
}