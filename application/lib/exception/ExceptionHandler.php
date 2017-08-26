<?php 
namespace app\lib\exception;
use think\exception\Handle;
use think\exception\HttpException;
use app\lib\exception\BaseException;
use think\Log;
class ExceptionHandler extends Handle{
	protected $code = 400;
    protected $msg ='请求出错';
    protected $errorCode='40000';
	public function render(\Exception $e)
    {
        if($e instanceof BaseException){
        	$this->code = $e->code;
        	$this->msg = $e->msg;
        	$this->errorCode = $e->errorCode;
        }else{
            
        	$this->code = '500';
        	$this->msg = '服务器内部错误';
        	$this->errorCode = '999';
        	$this->serverError($e);
            if(config('app_debug')){
                return parent::render($e);
            }
        	//TODO sentry发送错误日志
        }

        $rel = [
        	'msg'=>$this->msg,
        	'code'=>$this->errorCode,
        	'request_url'=>request()->url(),
        ];

        return json($rel,$this->code);
    }

    public function serverError(\Exception $e){
    	Log::init([
    		'type'=>'file',
    		'level'=>['error']
    	]);
    	Log::record($e->getMessage(),'error');
    }
}