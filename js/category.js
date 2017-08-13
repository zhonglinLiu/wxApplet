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
		str+= 
			'<div class="category-tool">'+
                '<a href="#/category/add" ><i class="layui-icon add-icon " >&#xe608;</i></a>'+
            '</div>';
		var len = d.length;
		for(var i=0;i<len;i++){
			var desc = d[i].description ? d[i].description : '';
			str+=
			'<li  >'+
				'<div class="category-icon-box">'+
					'<a href="#/category/edit" class="category-edit-icon" ><i class="layui-icon edit-icon " >&#xe642;</i></a>'+
					'<a href="#/category/del" ><i class="layui-icon del-icon " >&#xe640;</i></a>'+
				'</div>'+
                '<div class="category-detail" >'+
                    '<img src="'+d[i].img.url+'">'+
                    '<div class="category-desc" >'+
                    '<a href="#/category?id='+d[i].id+'&catename='+d[i].name+'" >'+
                        '<div class="name" >'+d[i].name+'</div>'+
                        '<div class="desc" >'+desc +'</div>'+
                    '</a>'+
                    '</div>'+
                '</div>'+
            '</li>';
		}
		str+='</ul>';
		this.str = str;
		this.desktop.html(str);
		this.bindEvent();
	};

	category.prototype.bindEvent = function() {
		$('.add-icon').hover(
			function(){
				layer.tips('添加分类',this,{
					tips:[4,'#3D6BA4']
				});
			},
			function(){

			}
		)
		$('.edit-icon').hover(
			function(){
				layer.tips('修改分类',this,{
					tips:[1,'#3D6BA4']
				});
			},
			function(){

			}
		)

		$('.del-icon').hover(
			function(){
				layer.tips('删除分类',this,{
					tips:[1,'#3D6BA4']
				});
			},
			function(){}
		)
	};

	return new category();
})()