var productImgSort = (function($){
	function imgSort(){
		this.desktop = $('.desktop-main');
	}
	imgSort.prototype.init = function(params) {
		var _this = this;
		this.product_id = params.product_id;
		this.requestProductImgs(function(d){
			_this.initUI(d);
		})
	};
	imgSort.prototype.initShowBigImg = function(params) {
		var url = params.url;
		var str = '<img class="show-big-img" src="'+url+'" >';
		this.getImgRealSize(url,function(W,H){
			layer.open({
			  type: 1,
			  title: false,
			  closeBtn: 0,
			  area: [W+'px',H+'px'],
			  skin: 'layui-layer-nobg', //没有背景色
			  shadeClose: true,
			  content: str
			});
		})
			
	};
	imgSort.prototype.requestProductImgs = function(callback) {
		request.get('products/getImgs?product_id='+this.product_id,function(d){
			console.log(d);
			callback && callback(d);
		})
	};
	imgSort.prototype.initUI = function(d) {
		var _this = this;
        this.str = htmlString.productImgList(d)

        this.renderLayerUI(function(){
        	_this.bindEvent();
        })
	};

	imgSort.prototype.renderLayerUI = function(callback) {
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

	imgSort.prototype.bindEvent = function() {
		$('.product-img-sort img').on('load',function(){
        var realW = $(this).width();
        var realH = $(this).height();
        var height = 100;
        var width = realW*height/realH;
        $(this).attr('width',width+'px');
        $(this).attr('height',height+'px');
	    })
	    $('.sort-id').blur(function(){
	    	var orderId = this.value;
	    	var id = $(this).attr('attr-id');
	    	var data = {
	    		order:orderId,
	    		id:id
	    	};
	    	request.post('products/imgOrder',data,function(d){
	    		console.log(d);
	    		if(d.code != 200){
	    			layer.open({title:'提示',content: d.msg,icon:2,});
	    		}
	    	})
	    })
	};

	imgSort.prototype.getImgRealSize = function(url,callback) {
		var imgtemp = new Image();//创建一个image对象
		imgtemp.src = url
		imgtemp.onload = function(){//图片加载完成后执行
			realWidth = this.width;
			realHeight = this.height;
			callback && callback(realWidth,realHeight);
		}
	};
	return new imgSort();
})(jQuery)

		