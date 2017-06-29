<?php 
namespace app\api\validate;
use think\Validate;
use think\Exception;
use think\Request;
use app\lib\exception\BaseException;
class BaseValidate extends Validate{
	public function goCheck(){
		$request = Request::instance();
		$params = $request->param();
		$rel = $this->check($params);
		if(!$rel){
			$error = $this->batch()->getError();
			throw new BaseException($error);
		}
		return true;
	}

	protected function isPostiveInt($value,$rule='',$data='',$field=''){
		if(is_numeric($value) && is_int($value+0) && ($value+0)>0){
			return true;
		}else{
			return false;
		}
	}

	protected function isNotEmpty($value,$rule='',$data='',$field=''){
		if(empty($value)){
			return false;
		}
		return true;
	}

	/**
	 * [checkRequestData 检查request的字段是否合法]
	 * @param  [type] $arrays [description]
	 * @return [type]         [description]
	 */
	public function checkRequestData($arrays){
		foreach ($this->rule as $k => $v) {
			if(!key_exists($k,$arrays)){
				throw new BaseException('参数:'.$k.'非法',400);
			}
		}
		if(count($arrays)!==count($this->rule)){
			throw new BaseException('请求存在非法参数',400);
		}
	}
}