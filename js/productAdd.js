var proaddModel = (function($){
	function product(){
		this.desktop = $('.desktop-main');
		this.isLoaded = false;
	}
	product.prototype.init = function() {
		var _this = this;
		
		this.getInitData(function(d){
			_this.renderCategeryUI(d)
			_this.preDom();
			_this.renderUI();
		})
		
	};

	product.prototype.getInitData = function(callback) {
		var params = {
			type:'get',
			url:'category/all',
			sCallback:function(d){
				callback && callback(d);
			}
		}
		window.base.getData(params);
	};

	product.prototype.renderCategeryUI = function(d) {
		this.selectStr = '';
		for(var i=0;i<d.length;i++){
			this.selectStr+='<option value="'+d[i].id+'">'+d[i].name+'</option>'
		}
	};

	product.prototype.preDom = function() {
		var str = 
		'<div id="form-box" >'+
		 '<form class="layui-form add-product-form" action="">'+
	      '<div class="layui-form-item">'+
	        '<label class="layui-form-label">商品名称</label>'+
	        '<div class="layui-input-block">'+
	          '<input type="text" name="name" required  lay-verify="required" placeholder="请输入商品名称" autocomplete="off" class="layui-input">'+
	        '</div>'+
	      '</div>'+
	        
	     '<div class="layui-form-item">'+
	        '<label class="layui-form-label">商品价格</label>'+
	        '<div class="layui-input-block">'+
	          '<input type="text" name="price" required  lay-verify="required" placeholder="请输入商品价格" autocomplete="off" class="layui-input">'+
	        '</div>'+
	      '</div>'+
	        
	        '<div class="layui-form-item">'+
	        '<label class="layui-form-label">商品库存</label>'+
	        '<div class="layui-input-block">'+
	          '<input type="text" name="stock" required  lay-verify="required|number" placeholder="请输入商品库存" autocomplete="off" class="layui-input">'+
	        '</div>'+
	      '</div>'+
	        
	        '<div class="category-box">'+
	         '<select name="category" lay-verify="required">'+
	          '<option value="">请选择所属分类</option>'+
	          this.selectStr+
	        '</select>'+
	        '</div>'+

	         '<div class="layui-form-item">'+
                '<label class="layui-form-label">图片来源</label>'+
                '<div class="layui-input-block">'+
                  '<input type="radio" name="from" value="2" title="公网">'+
                  '<input type="radio" name="from" value="1" title="本地" checked>'+
                '</div>'+
              '</div>'+
	    
	      '<div class="layui-form-item layui-form-text">'+
	        '<label class="layui-form-label">摘要</label>'+
	        '<div class="layui-input-block">'+
	          '<textarea name="summary" placeholder="请输入内容" class="layui-textarea"></textarea>'+
	        '</div>'+
	      '</div>'+

	      '<div class="show-image" >'+
	      '<div class="layui-form-item">'+
	          '<div class="main-img"></div>'+
	          '<div class="other-img"></div>'+
	       '</div>'+
	      '</div>'+

	      '<div class="upload-box">'+
	          '<input type="file" lay-title="商品主图片" name="main_img_url" class="layui-upload-file">'+
	      '</div>'+
	      '<div id="uploader" ></div>'+
	      '<button class="layui-btn submit-btn" lay-submit lay-filter="formDemo">立即提交</button>'+
	    '</form>'+
	    '</div>';
	    this.str = str;
	};

	product.prototype.renderUI = function() {
		var _this = this;
		layui.use('layer',function(){
			var layer = layui.layer;
			layer.open({
				type:1,
				title:'<div class="title" >保存</div>',
				area:['800px','600px'],
				closeBtn:2,
				maxmin:false,
				content: _this.str,
				success:function(){
					_this.useLayerForm(function(d){
						formCallback(d);
					});
					_this.userLayerUpload();
				}
			})
		})

		var formCallback = function(d){
			var params = {
				type:'post',
				url:'products/addone',
				data:d,
				sCallback:function(d){
					console.log(d)
				},
				eCallback:function(d){
					console.log(d);
				}
			}

			window.base.getData(params);
		}
	};


	product.prototype.useLayerForm = function(callback) {
		layui.use('form', function(){
		  var form = layui.form();
		  form.render();
		  form.on('submit(formDemo)', function(data){
		    callback && callback(data.field);
		    return false
		  });
		});

		
	};

	product.prototype.userLayerUpload = function() {
		var opts = {
			wrap:'#uploader',
			url:window.base.g_restUrl+'upload/image',
			fileNumLimit:1,
			sCallback:function(res){
				var path = 'http://zerg.com/upload/'+res.path;
				if(res.code==200){
					$( '#'+file.id ).addClass('upload-state-done');
					$('.add-product-form').append('<input type="hidden" name="main_img_url" value="'+path+'" >');
				}
			}
		}
		UploadImage(opts)


		

	};

	product.prototype.bindEvent = function() {
		// body...
	};

	return new product();
})($)
