<?php 
namespace app\api\behavior;
class Rules{
	public static function IdMustBePostiveInt($value,$rule='',$data='',$field=''){
		return true;
	}
}