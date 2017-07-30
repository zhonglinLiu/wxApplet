var productModel = (function($){
	function product(){
		this.desktop = $('.desktop-main');
	};
	product.prototype.init = function(params) {
		if(!params){
			this.page = 1;
			this.size = 5;
		}else{
			this.page = params[0].page;
			this.size = params[1].size;
		}
		
		this.desktop.empty();
		this.initUI();
		this.getTotalPage();

	};

	product.prototype.request = function(url,callback) {
		var _this = this;
		var params = {
			type:'get',
			url:url,
			sCallback: function(d){
				callback && callback(d)
			}
		}
		window.base.getData(params);
	};

	product.prototype.getTotalPage = function() {
		var _this = this;
		this.request("products/count",function(d){
			_this.totalPage = Math.floor(d.count/_this.size);
			_this.paging();
			_this.getproductData(function(d){
				// _this.renderUI(d);
				_this.renderProductList(d);
			});
		})
	};

	product.prototype.getproductData = function(callback) {
		var _this = this;
		var url = "products/by_page?page="+this.page+"&size="+this.size;
		this.request(url,function(d){
			callback && callback(d)
			
			// _this.paging();
		});
	};

	product.prototype.initUI = function() {
		var str = '<div class="main-box" ></div>'+
		'<div class="paging-box" ></div>';
		this.desktop.html(str);
		this.mainbox = $('.main-box');
		this.pagebox = $('.paging-box');

		var str = 
		'<div class="bar-main">'+
			'<div class="product-tool">'+
                '<a href="#/product/add" ><i class="layui-icon add-icon " >&#xe608;</i></a>'+
            '</div>'+
           '<div class="search-box" >'+
          	 	' <div class="prompt" >'+
                    '以商品id查找 id:id,'+
                    '以商品名称查找 name:name,'+
                    '以创建时间倒序排序 create_time:<,'+
                    '以创建时间正序排序create_time:>'+
                '</div>'+
                '<i class="layui-icon help-icon " >&#xe607;</i>'+
           		'<i class="layui-icon search-icon " >&#xe615;</i> <input type="text" class="search-input" name="search">'+
           '</div>'+
        '</div>'+
        '<div class="product-box">'+
		'<table cellspacing="0" >'+
	        '<thead>'+
	            '<tr class="table-header">'+
	                '<td>ID</td>'+
	                '<td>商品名称</td>'+
	                '<td>商品价格</td>'+
	                '<td>商品库存</td>'+
	                '<td>创建时间</td>'+
	                '<td>更新时间</td>'+
	                '<td>操作</td>'+
	            '</tr>'+
	        '</thead><tbody id="product-table">';
	    // str+= this.preProductsList(d);
	    str+='</tbody></table>  </div>';
	    this.mainbox.append($(str));
	    this.tablebody = $('#product-table');
	    this.bindEvent();
	};



	product.prototype.preProductsList = function(d) {
		var str = '';
		for(var i=0;i<this.size;i++){
	    	str+=
	    		'<tr>'+
                    '<td>'+d[i].id+'</td>'+
                    '<td> <a class="product-link" href="#/product?id='+d[i].id+'" > '+d[i].name+'</a>  </td> '+
                    '<td>'+d[i].price+'￥</td>'+
                    '<td>'+d[i].stock+'</td>'+
                    '<td>'+d[i].create_time+'</td>'+
                    '<td>'+d[i].update_time+'</td>'+
                    '<td><a href="javascript:void(0)" ><i class="layui-icon edit-icon " >&#xe642;</i></a>'+
                    '<a href="javascript:void(0)"><i class="layui-icon del-icon " >&#xe640;</i></a></td>'+
                '</tr>';
	    }
	    return str;
	};

	product.prototype.renderProductList = function() {
		var _this = this;
		this.getproductData(function(d){
			var str = _this.preProductsList(d);
			_this.tablebody.html(str);
		})
	};

	product.prototype.paging = function() {
		var _this = this;
		var flog = false;
		var str = '<div class="paging" id="paging"></div>';
		this.pagebox.append($(str));
		layui.use(['laypage', 'layer'], function(){
		  var laypage = layui.laypage
		  ,layer = layui.layer;
		  
		  laypage({
		    cont: 'paging',
		    pages: _this.totalPage,
		    curr: _this.page,
		    groups: 5,
		    jump:function(obj,first){
		    	_this.totalPage = obj.pages;
		    	_this.page = obj.curr;
		    	if(flog)
		    		_this.renderProductList();
		    	flog = true;
		    }
		  });

		  
		});
	};

	product.prototype.bindEvent = function() {
		$('.help-icon').hover(
			function(){
				console.log(1232)
				$('.prompt').show()
			},
			function(){
				$('.prompt').hide()
			}
		);

		$('.search-input').focus(function(){
			$('.search-icon').hide();
		});
		$('.search-input').blur(function(){
			$('.search-icon').show();
		})

		$('.add-icon').hover(function(){
			layer.tips('添加商品',this,{
				tips:[2,'#3D6BA4']
			});
		})
		$('.add-icon').click(function(){
			window.base.public();
		})
	};

	return new product()
})($)