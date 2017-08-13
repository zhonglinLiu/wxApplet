var proaddModel = (function($){
	function product(){
		this.desktop = $('.desktop-main');
		this.isLoaded = false;
	}
	/**
	 * [init 添加商品主信息]
	 * @return {[type]} [description]
	 */
	product.prototype.init = function(data) {
		var _this = this;
		
		this.requestCategorys(function(d){
			_this.renderCategeryUI(d,data)
			_this.preDom(data);
			_this.renderLayerUI(function(){
				_this.useLayerForm(function(d){
					if(!!data)
						d.id = _this.product_id
					_this.formCallback(d);
				});
				_this.userLayerUpload({});
			});
		})
	};

	product.prototype.editProductInit = function(params) {
		var _this = this;
		this.product_id = params.product_id;
		request.get('products/'+this.product_id,function(d){
			_this.init(d);
		})
	};
	/**
	 * [initProductImg 添加商品图片信息]
	 * @param  {[type]} params [description]
	 * @return {[type]}        [description]
	 */
	product.prototype.initProductImg = function(params) {
		var _this = this;
		this.product_id = params.product_id;
		this.renderProductImgUI();
		this.renderLayerUI(function(){
			_this.useLayerForm(function(d){
				_this.productImgFormCallback(d);
			});
			_this.userLayerUpload({
				warp:'#uploader2',
				fileNumLimit:100
			},'imgs[]');
		})
	};

	/**
	 * [initProductProperty 添加商品描述]
	 * @return {[type]} [description]
	 */
	product.prototype.initProductProperty = function(params) {
		var _this = this;
		this.product_id = params.product_id;
		this.requestProperty(this.product_id,function(d){
			var str = _this.renderPropertyListUI(d);
			_this.renderPropertyUI(str);
			_this.renderLayerUI(function(){
				_this.bindOncePropertyEvent();
				_this.bindPropertyEvent();
			})
		})
		

	};

	product.prototype.renderPropertyUI = function(trs) {
		if(arguments.length == 0){
			var trs = '';
		}
		var str = 
		'<div class="product-proprety-box" >'+
		 		'<div class="product-property">'+
                    '<i class="layui-icon product-property-add-icon" >&#xe608;</i>'+
                '</div>'+
            '<form class="product-property-form" >'+
			'<table class="layui-table">'+
              '<colgroup>'+
                '<col width="150">'+
                '<col>'+
              '</colgroup>'+
              '<thead>'+
                '<tr>'+
                  '<th>商品属性</th>'+
                  '<th>属性详情</th>'+
                '</tr>' +
              '</thead>'+
              '<tbody class="product-property-tbody" >'+
              	trs+
              '</tbody>'+
            '</table>'+
            '</form>'+
            '<button class="layui-btn layui-btn-primary product-property-save ">保存</button>'+
		'</div>';
		this.str = str;
	};

	product.prototype.renderPropertyListUI = function(d) {
		var str = '';
		for(var k in d){
			str+=
				'<tr attr-property-id="'+d[k].id+'" class="tr-property-id" >'+
                  '<td> <input type="text" class="property-name" name="name" value="'+d[k].name+'" /></td>'+
                  '<td> <input type="text" class="property-detail" name="detail" value="'+d[k].detail+'" /> <i class="layui-icon product-property-del-icon" >&#xe640;</i> </td>'+
                '</tr>';
		}
		return str;
	};

	

	product.prototype.renderProductImgUI = function() {
		var str = 
			'<div id="form-box" >'+
				'<label class="layui-form-label">添加商品详情图片</label>'+
				'<div id="uploader2" class="uploader" ></div>'+
				'<form class="layui-form add-product-form" action="">'+
					'<input type="hidden" name="id" value="'+this.product_id+'">'+
					'<button class="layui-btn submit-btn" lay-submit lay-filter="formDemo">立即提交</button>'+
				'</form>'+
			'</div>';
		this.str = str;
	};

	product.prototype.requestCategorys = function(callback) {
		var params = {
			type:'get',
			url:'category/all',
			sCallback:function(d){
				callback && callback(d);
			}
		}
		window.base.getData(params);
	};
	product.prototype.requestProperty = function(id,callback) {
		var params = {
			type:'get',
			url: 'products/getProperty?id='+id,
			sCallback: function(d){
				callback && callback(d);
			}
		}
		window.base.getData(params);
	};
	product.prototype.requestPropertyAdd = function(data,callback) {
		var params = {
			type:'post',
			url:'products/addProperty',
			data:{'propertys':data},
			sCallback: function(d){
				callback && callback(d);
			},
			eCallback: function(d){
				callback && callback(d);
			}
		}
		window.base.getData(params);
	};

	product.prototype.renderCategeryUI = function(d,data) {
		this.selectStr = '';
		var data = data ? data : {};
		for(var i=0;i<d.length;i++){
			this.selectStr+='<option '+(data.category_id==d[i].id ? "selected" : " ") +' value="'+d[i].id+'">'+d[i].name+'</option>'
		}
	};

	product.prototype.preDom = function(data) {
		var data = data ? data : {};
		var str = 
		'<div id="form-box" >'+
		 '<form class="layui-form add-product-form" action="">'+
	      '<div class="layui-form-item">'+
	        '<label class="layui-form-label">商品名称</label>'+
	        '<div class="layui-input-block">'+
	          '<input type="text" name="name" value="'+(!!data.name ? data.name :"")+'" required  lay-verify="required" placeholder="请输入商品名称" autocomplete="off" class="layui-input">'+
	        '</div>'+
	      '</div>'+
	        
	     '<div class="layui-form-item">'+
	        '<label class="layui-form-label">商品价格</label>'+
	        '<div class="layui-input-block">'+
	          '<input type="text" name="price" value="'+(!!data.price ? data.price :"")+'" required  lay-verify="required" placeholder="请输入商品价格" autocomplete="off" class="layui-input">'+
	        '</div>'+
	      '</div>'+
	        
	        '<div class="layui-form-item">'+
	        '<label class="layui-form-label">商品库存</label>'+
	        '<div class="layui-input-block">'+
	          '<input type="text" name="stock" value="'+(!!data.stock ? data.stock :"")+'" required  lay-verify="required|number" placeholder="请输入商品库存" autocomplete="off" class="layui-input">'+
	        '</div>'+
	      '</div>'+
	        
	        '<div class="product-add-category-box">'+
	         '<select name="category_id" lay-verify="required">'+
	          '<option value="">请选择所属分类</option>'+
	          this.selectStr+
	        '</select>'+
	        '</div>'+

	         '<div class="layui-form-item">'+
                '<label class="layui-form-label">图片来源</label>'+
                '<div class="layui-input-block">'+
                  '<input type="radio" name="from" value="2" '+(data.from==2 ? "check" : '')+' title="公网">'+
                  '<input type="radio" name="from" value="1" '+(data.from==1 ? "check" : '')+' title="本地" checked>'+
                '</div>'+
              '</div>'+
	    
	      '<div class="layui-form-item layui-form-text">'+
	        '<label class="layui-form-label">摘要</label>'+
	        '<div class="layui-input-block">'+
	          '<textarea name="summary"  value="'+(!!data.summary ? data.summary :"")+'" placeholder="请输入内容" class="layui-textarea"></textarea>'+
	        '</div>'+
	      '</div>'+
	      '<div class="layui-form-item">'+
	      	'<label class="layui-form-label">商品主图片</label>'+
	      	(!!data.main_img_url ? '<img src="'+data.main_img_url+'" >' : '')+
	      '</div>'+
	      '<div id="uploader" class="uploader" ></div>'+
	      '<button class="layui-btn submit-btn" lay-submit lay-filter="formDemo">立即提交</button>'+
	    '</form>'+
	    '</div>';
	    this.str = str;
	};

	product.prototype.renderLayerUI = function(callback) {
		var _this = this;
		layui.use('layer',function(){
			var layer = layui.layer;
			_this.layerIndex = layer.open({
				type:1,
				title:'<div class="title" >保存</div>',
				area:['800px','300px'],
				closeBtn:2,
				maxmin:false,
				content: _this.str,
				success:function(){
					callback && callback()
					/*_this.useLayerForm(function(d){
						formCallback(d);
					});
					_this.userLayerUpload();*/
				}
			})
		})

		
	};

	product.prototype.productImgFormCallback = function(d) {
		var _this = this;
		var params = {
			type:'post',
			url:'products/addImage',
			data:d,
			sCallback:function(d){
				if(d.code=='200'){
					layer.close(_this.layerIndex);
					var layerIndex = layer.open({
						title:'提示',content: d.msg,icon:1,
						yes: function(){
							layer.close(layerIndex);
							// _this.initProductProperty();
							pubsub.public('/product/productProperty?product_id='+d.product_id);
						}
					});
				}else{
					layer.open({title:'提示',content: d.msg,icon:2,});
				}
			},
			eCallback:function(d){
				layer.open({title:'提示',content: d.msg,icon:2,});
			}
		}

		window.base.getData(params);
	};

	product.prototype.formCallback = function(d) {
		var _this = this;
		var params = {
			type:'post',
			url:'products/addone',
			data:d,
			sCallback:function(d){
				layer.close(_this.layerIndex);
				if(!!d.product_id){
					// _this.product_id = d.product_id;
					// _this.initProductImg();
					pubsub.public('/product/addImage?product_id=:product_id',{ 'product_id':d.product_id});
				}
				
			},
			eCallback:function(d){
				console.log(d);
			}
		}

		window.base.getData(params);
	};


	product.prototype.useLayerForm = function(callback) {
		var _this = this;
		layui.use('form', function(){
		  var form = layui.form();
		  form.render();
		  form.on('submit(formDemo)', function(data){
		    callback && callback(data.field);
		    return false
		  });
		});
	};

	product.prototype.userLayerUpload = function(opt,name) {
		var inputName = !!name ? name : 'main_img_url';
		var opts = {
			wrap:!!opt.warp ? opt.warp:'#uploader',
			url:window.base.g_restUrl+'upload/image',
			fileNumLimit:!!opt.fileNumLimit ? opt.fileNumLimit : 1,
			sCallback:function(res){
				var path = res.path;
				if(res.code==200){
					$('.add-product-form').append('<input type="hidden" name="'+inputName+'" value="'+path+'" >');
				}
			}
		}
		
		UploadImage(opts)

	};

	product.prototype.bindEvent = function() {
		// body...
	};

	product.prototype.bindPropertyEvent = function() {
		var _this = this;
		$('.product-property-tbody').delegate(".product-property-del-icon",'click',function(){
			var tr = $(this).parent().parent();
			var data = {
				product_id:_this.product_id,
				id:tr.attr('attr-property-id')
			};
			var params = {
				type:'post',
				url:'products/delProperty',
				data:data,
				sCallback:function(d){
					if(d.code==200){
						tr.remove();
						layer.open({title:'提示',content:d.msg,icon:1,})
					}else{
						layer.open({title:'提示',content:d.msg,icon:2,})
					}
				},
				eCallback:function(d){
					layer.open({title:'提示',content:d.msg,icon:2,})
				}
			}
			window.base.getData(params);
		});
	};
	product.prototype.bindOncePropertyEvent = function(){
		var _this = this;
		$('.product-property-add-icon').hover(
			function(){
				layer.tips('添加商品属性','.product-property-add-icon',{tips:[1,'#3D6BA4']});
			},
			function(){}
		);
		$('.product-property-add-icon').click(function(){
			var str =
				'<tr attr-property-id="" >'+
                  '<td> <input type="text" class="property-name" name="name" value="" /></td>'+
                  '<td> <input type="text" class="property-detail" name="detail" /> <i class="layui-icon product-property-del-icon" >&#xe640;</i> </td>'+
                '</tr>';
			$('.product-property-tbody').append($(str));
			_this.bindPropertyEvent();
		});
		//提交
		$('.product-property-save').click(function(){
			var name = $('.property-name');
			var detail = $('.property-detail');
			var ids = $('.tr-property-id');
			var data = {};
			var len = name.length;
			for(var i=0;i<len;i++){
				data[i] = {
					'name':name[i].value,
					'detail':detail[i].value,
					'product_id':_this.product_id
				};
				var id = $(ids[i]).attr('attr-property-id');
				if(!!id){
					data[i].id = id;
				}
			}
			console.log(data);
			_this.requestPropertyAdd(data,function(d){
				
				if(d.code=='200'){
					layer.open({title:'提示',content:d.msg,icon:1,})
				}else{
					layer.open({title:'提示',content:d.msg,icon:2,})
				}
			})
		})
	}
	return new product();
})($)
