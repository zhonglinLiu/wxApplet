var categoryModel = (function(){
	function category(){
		this.desktop = $('.desktop-main');
		this.desktop.empty();
		this.idLoad = false;
		this.str = '';
	}

	category.prototype.init = function() {
		this.request();
	};

	category.prototype.request = function() {
		if(this.str!=''){
			this.desktop.html(this.str);
			return;
		}
		var _this = this;
		var params = {
			type:'get',
			url:'category/all',
			sCallback: function(d){
				_this.renderUI(d);
			}
		}
		window.base.getData(params)
	};

	category.prototype.renderUI = function(d) {
		if(this.str!=''){
			this.desktop.html(this.str);
			return;
		}
		var str = '<ul class="category-box" >';
		var len = d.length;
		for(var i=0;i<len;i++){
			var desc = d[i].description ? d[i].description : '';
			str+=
			'<a href="#/category?id='+d[i].id+'&catename='+d[i].name+'" >'+
			'<li  >'+
                '<div class="category-detail" >'+
                    '<img src="'+d[i].img.url+'">'+
                    '<div class="category-desc" >'+
                        '<div class="name" >'+d[i].name+'</div>'+
                        '<div class="desc" >'+desc +'</div>'+
                    '</div>'+
                '</div>'+
            '</li>'+
            '</a>';
		}
		str+='</ul>';
		this.str = str;
		this.desktop.html(str);
	};

	return new category();
})()