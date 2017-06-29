<?php 
namespace app\lib\exception;
use think\Exception;
class ServerException extends Exception{
	public $code=500;
	public $msg='服务器错误';
	public $errorCode=50000;
	public function __construct($msg='',$code='',$errorCode=''){
		$this->errorCode = empty($errorCode) ? $this->errorCode : $errorCode;
		$this->code = empty($code) ? $this->code : $code;
		$this->msg = empty($msg) ? $this->msg : $msg;
	}
	
}