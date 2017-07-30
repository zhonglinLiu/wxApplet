var categeryProductsModel = (function($){
	function category(){
		this.desktop = $('.desktop-main');
		this.productsArr = [];
	}

	category.prototype.init = function(params) {
		this.desktop.empty();
		this.id = params[0].id;
		this.catename = params[1].catename;
		if(!!this.productsArr[this.id]){
			this.desktop.html(this.productsArr[this.id]);
			return;
		}
		this.request();
	};
	category.prototype.request = function() {
		var _this = this;
		var params = {
			type:'get',
			url:'products/by_category?id='+this.id,
			sCallback: function(d){
				console.log(d);
				_this.renderUI(d);
			}
		}
		window.base.getData(params);
	};

	category.prototype.renderUI = function(d) {
		var str = '<div class="title" >'+this.catename+'</div>';
		str+= '<ul class="categoryProduct-box" >';
		var len = d.length;
		for(var i=0;i<len;i++){
			str+=
			'<a href="#/product/'+d[i].id+'" >'+
			'<li>'+
                '<div class="categoryProduct-detail" >'+
                    '<img src="'+d[i].main_img_url+'">'+
                    '<div class="categoryProduct-desc" >'+
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
	category.prototype.bindEvent = function() {
		// body...
	};

	return new category();
})($);



