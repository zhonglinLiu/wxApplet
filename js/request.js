var request = (function($){
	function request(){

	}

	request.prototype.post = function(url,data,callback) {
		window.base.getData({
			type:'post',
			data:data,
			url:url,
			sCallback:function(d){
				callback && callback(d);
			},
			eCallback:function(d){
				callback && callback(d);
			}
		})
	};

	request.prototype.get = function(url,callback) {
		window.base.getData({
			type:'get',
			url:url,
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