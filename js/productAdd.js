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
		
		this.str = htmlString.productProperty(trs);
	};

	product.prototype.renderPropertyListUI = function(d) {
		return htmlString.addImgsRows(d);
	};

	

	product.prototype.renderProductImgUI = function() {
		this.str = htmlString.addImgs(this.product_id);
	};

	product.prototype.requestCategorys = function(callback) {
		requestAction.requestCategorys(function(d){
			callback && callback(d);
		})
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
		requestAction.requestProperty(data,callback);
	};

	product.prototype.renderCategeryUI = function(d,data) {
		this.selectStr = '';
		var data = data ? data : {};
		for(var i=0;i<d.length;i++){
			this.selectStr+='<option '+(data.category_id==d[i].id ? "selected" : " ") +' value="'+d[i].id+'">'+d[i].name+'</option>'
		}
	};

	product.prototype.preDom = function(data) {
		
	    this.str = htmlString.productMain(data,this.selectStr);
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
				}
			})
		})

		
	};

	product.prototype.productImgFormCallback = function(d) {
		var _this = this;
		requestAction.requestAddImg(d,function(d){
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
		})
	};

	product.prototype.formCallback = function(d) {
		var _this = this;

		//To be tested
		requestAction.requestAddProduct(d,function(d){
			layer.close(_this.layerIndex);
			if(!!d.product_id){
				pubsub.public('/product/addImage?product_id=:product_id',{ 'product_id':d.product_id});
			}else{
				console.log(d);
			}
		})
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

			requestAction.requestDelProperty(data,function(d){
				if(d.code==200){
					tr.remove();
					layer.open({title:'提示',content:d.msg,icon:1,})
				}else{
					layer.open({title:'提示',content:d.msg,icon:2,})
				}
			})
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
			data = {propertys:data};
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
