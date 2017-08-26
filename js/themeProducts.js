var themeProductsModel = (function($){
	function theme(){
		this.desktop = $('.desktop-main');
		this.productsArr = [];
	}

	theme.prototype.init = function(params) {
		this.desktop.empty();
		this.id = params.id;
		if(!!this.productsArr[this.id]){
			this.desktop.html(this.productsArr[this.id]);
			return;
		}
		this.request();
	};
	theme.prototype.request = function() {
		var _this = this;
		requestAction.requestThemeProducts(this.id,function(res){
			console.log(res);
			_this.renderUI(res);
		})
	};

	theme.prototype.renderUI = function(data) {
		var str = '<div class="title" >'+data.name+'</div>';
		str+= '<ul class="themeProduct-box" >';
		var d = data['products'];
		var len = d.length;
		for(var i=0;i<len;i++){
			str+=
			'<a href="#/product/'+d[i].id+'" >'+
			'<li>'+
                '<div class="themeProduct-detail" >'+
                    '<img src="'+d[i].main_img_url+'">'+
                    '<div class="themeProduct-desc" >'+
                        '<div class="name" >'+d[i].name+'</div>'+
                        '<div class="desc" >'+
                            '<div class="price" >价格: <span>'+d[i].price+'￥</span></div>'+
                            '<div class="stock">库存: <span>'+d[i].stock+'</span></div>'+
                        '</div>'+
                    '</div>'+ 
                '</div>'+
            '</li>'
		}
		str+='</ul>';
		if(!this.productsArr[this.id]){
			this.productsArr[this.id] = str;
		}
		this.desktop.html(str);
		
	};
	theme.prototype.bindEvent = function() {
		// body...
	};

	return new theme();
})($);



