<?php 
namespace app\lib\exception;
use think\Exception;
class BaseException extends Exception{
	public $code=400;
	public $msg='请求错误';
	public $errorCode=40000;
	public function __construct($msg='',$code='',$errorCode=''){
		$this->errorCode = empty($errorCode) ? $this->errorCode : $errorCode;
		$this->code = empty($code) ? $this->code : $code;
		$this->msg = empty($msg) ? $this->msg : $msg;
	}
	
}