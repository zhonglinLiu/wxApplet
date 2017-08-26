var htmlString = (function($){
	function html(){

	}

	html.prototype.productMain = function(data,selectStr) {
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
	          selectStr+
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
	    return str;
	};

	html.prototype.productProperty = function(trs) {
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
		return str;
	};

	html.prototype.addImgs = function(product_id) {
		var str = 
			'<div id="form-box" >'+
				'<div>添加商品详情图片</div>'+
				'<div id="uploader2" class="uploader" ></div>'+
				'<form class="layui-form add-product-form" action="">'+
					'<input type="hidden" name="id" value="'+product_id+'">'+
					'<button class="layui-btn submit-btn" lay-submit lay-filter="formDemo">立即提交</button>'+
				'</form>'+
			'</div>';
		return str
	};
	html.prototype.addImgsRows = function(d) {
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

	html.prototype.productImgList = function(d) {
		var str = '';
			
		for(var k in d){
			str+=
			'<tr>'+
              '<td><input class="sort-id" attr-id="'+d[k].id+'" type="text" name="img[]" value="'+d[k].order+'"></td>'+
              '<td><a href="#/product/showBigImg?url='+d[k].img_url.url+'"><img src="'+d[k].img_url.url+'"></a> <i class="layui-icon product-img-del" >&#xe640;</i></td>'+
              // '<input type="hidden" name="img_id[]" value="'+d[k].img_id+'">'
            '</tr>';
		}
		str = 
			'<div class="product-img-sort" >'+
                '<div class="product-sort-tool">'+
                    '<a href="javascript:void(0)" class="product-img-add" ><i class="layui-icon add-icon " >&#xe608;</i></a>'+
                '</div>'+
                '<table class="layui-table">'+
                  '<colgroup>'+
                    '<col width="150">'+
                    '<col>'+
                  '</colgroup>'+
                  '<thead>'+
                    '<tr>'+
                      '<th>序号</th>'+
                      '<th>图片</th>'+
                    '</tr>'+
                  '</thead>'+
                  '<tbody>'+
                    str+
                  '</tbody>'+
                '</table>'+
            '</div>';
        return str;
	};

	return new html();
})(jQuery)