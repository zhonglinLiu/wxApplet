var request = (function($){
	function request(){

	}

	request.prototype.post = function(url,data,callback) {
		window.base.getData({
			type:'post',
			data:data,
			url:url,
			tokenFlag:true,
			sCallback:function(d){
				callback && callback(d);
			},
			eCallback:function(d){
				callback && callback(d);
			}
		})
	};

	request.prototype.get = function(url,callback,tokenFlag,data) {
		window.base.getData({
			type:'get',
			url:url,
			data: !data ? '' : data,
			tokenFlag: !!tokenFlag,
			sCallback:function(d){
				callback && callback(d);
			},
			eCallback:function(d){
				callback && callback(d);
			}
		})
	};

	return new request();
})(jQuery)

var requestAction = (function($){
	function requestAction(){

	}
	requestAction.prototype = request.__proto__;
	requestAction.prototype.requestCategorys = function(callback) {
		this.get('category/all',function(d){
			callback && callback(d);
		})
	};

	requestAction.prototype.requestProperty = function(data,callback) {
		this.post('products/addProperty',data,function(res){
			callback && callback(res);
		})
	};

	requestAction.prototype.requestAddImg = function(data,callback) {
		this.post('products/addImage',data,function(res){
			callback && callback(res);
		})
	};

	requestAction.prototype.requestAddProduct = function(d,callback) {
		this.post('products/addone',d,function(res){
			callback && callback(res);
		})
	};

	requestAction.prototype.requestDelProperty = function(data,callback) {
		this.post('products/delProperty',data,function(res){
			callback && callback(res);
		})
	};

	requestAction.prototype.requestGetOrder = function(data,callback) {
		this.get('user_orders',function(res){
			callback && callback(res);
		},true,data)
	};

	requestAction.prototype.requestGetThemes = function(callback) {
		this.get('themes',function(res){
			callback && callback(res);
		})
	};
	return new requestAction();
})(jQuery)