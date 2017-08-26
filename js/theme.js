var themeModel = (function($){
	function theme(){
		this.desktop = $('.desktop-main');
	}
	theme.prototype.init = function() {
		var _this = this;
		if(!!this.str){
			this.desktop.html(this.str);
			return;
		}
		requestAction.requestGetThemes(function(res){
			_this.renderUI(res);
		})
	};

	theme.prototype.renderUI = function(d) {
		var str = '<ul class="theme-box" >';
		str+= 
			'<div class="theme-tool">'+
                '<a href="#/theme/add" ><i class="layui-icon add-icon " >&#xe608;</i></a>'+
            '</div>';
		var len = d.length;
		for(var i=0;i<len;i++){
			var desc = d[i].description ? d[i].description : '';
			str+=
			'<li  >'+
				'<div class="theme-icon-box">'+
					'<a href="#/theme/edit" class="theme-edit-icon" ><i class="layui-icon edit-icon " >&#xe642;</i></a>'+
					'<a href="#/theme/del" ><i class="layui-icon del-icon " >&#xe640;</i></a>'+
				'</div>'+
                '<div class="theme-detail" >'+
                    '<img src="'+d[i].head_img.url+'">'+
                    '<div class="theme-desc" >'+
                    '<a href="#/theme?id='+d[i].id+
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

	theme.prototype.bindEvent = function() {
		// body...
	};

	return new theme()
})(jQuery)