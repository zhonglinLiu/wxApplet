var orderModel = (function($){
	function order(){
		this.indexData = [];
		this.pageIndex = 1;
		this.moreDataFlag=true;
		this.desktop = $('.desktop-main');
	}

	order.prototype.init = function() {
		this.renderUI();
		if(this.indexData.length>0){
			this.getOrderFromCache();
		}else{
			this.getOrders();
		}
		// this.getOrders();
		this.event();
	};

	order.prototype.renderUI = function() {
		var str = '<div class="order-box">'+
            '<table cellspacing="0" ng-show="docArr.length>0">'+
                '<thead>'+
                    '<tr>'+
                        '<td>订单号</td>'+
                        '<td>商品名称</td>'+
                        '<td>商品总数</td>'+
                        '<td>商品总价格</td>'+
                        '<td>订单状态</td>'+
                        '<td>下单时间</td>'+
                        '<td>操作</td>'+
                    '</tr>'+
                '</thead>'+
                '<tbody id="order-table">'+

                '</tbody>'+
            '</table>'+
            '<div class="load-more">点击加载更多</div>'+
            '<div class="no-more">没有更多订单了</div>'+
        '</div>';
        this.desktop.html(str);
	};

	order.prototype.pushOrders = function(arr){
        var len = arr.length;
        if(len>0){
            for(var i=0;i<len;i++){
                this.indexData.push(arr[i]);
            }
        }
    }

     /*
    * 获取数据 分页
    * params:
    * pageIndex - {int} 分页下表  1开始
    */
    order.prototype.getOrders = function(){
    	var _this = this;
        var params={
            url:'user_orders',
            type: 'get',
            data:{page:this.pageIndex,size:5},
            tokenFlag:true,
            sCallback:function(res) {
                _this.pushOrders(res.data);
                var str = _this.getOrderHtmlStr(res.data);
                $('#order-table').append(str);
            }
        };
        window.base.getData(params);
        return;
    }

    order.prototype.getOrderFromCache = function() {
    	var str = this.getOrderHtmlStr(this.indexData);
        $('#order-table').append(str);
        return;
    };

    /*拼接html字符串*/
    order.prototype.getOrderHtmlStr = function(res){
        var data = res;
        if (data){
            var len = data.length,
                str = '', item;
            if(len>0) {
                for (var i = 0; i < len; i++) {
                    item = data[i];
                    str += '<tr>' +
                        '<td>' + item.order_no + '</td>' +
                        '<td>' + item.snap_name + '</td>' +
                        '<td>' + item.total_count + '</td>' +
                        '<td>￥' + item.total_price + '</td>' +
                        '<td>' + this.getOrderStatus(item.status) + '</td>' +
                        '<td>' + item.create_time + '</td>' +
                        '<td data-id="' + item.id + '">' + this.getBtns(item.status) + '</td>' +
                        '</tr>';
                }
            }
            else{
                this.ctrlLoadMoreBtn();
                this.moreDataFlag=false;
            }
            return str;
        }
        return '';
    }

    /*根据订单状态获得标志*/
    order.prototype.getOrderStatus = function(status){
        var arr=[{
            cName:'unpay',
            txt:'未付款'
        },{
            cName:'payed',
            txt:'已付款'
        },{
            cName:'done',
            txt:'已发货'
        },{
            cName:'unstock',
            txt:'缺货'
        }];
        return '<span class="order-status-txt '+arr[status-1].cName+'">'+arr[status-1].txt+'</span>';
    }

    /*控制加载更多按钮的显示*/
    order.prototype.ctrlLoadMoreBtn = function(){
        if(this.moreDataFlag) {
            $('.load-more').hide().next().show();
        }
    }

     /*根据订单状态获得 操作按钮*/
    order.prototype.getBtns = function(status){
        var arr=[{
            cName:'done',
            txt:'发货'
        },{
            cName:'unstock',
            txt:'缺货'
        }];
        if(status==2 || status==4){
            var index=0;
            if(status==4){
                index=1;
            }
            return '<span class="order-btn '+arr[index].cName+'">'+arr[index].txt+'</span>';
        }else{
            return '';
        }
    }
    order.prototype.event = function() {
    	var _this = this;
    	 /*加载更多*/
    	$(document).on('click','.load-more',function(){
	        if(_this.moreDataFlag) {
	            _this.pageIndex++;
	            _this.getOrders();
	        }
	    });

    	/*发货*/
	    $(document).on('click','.order-btn.done',function(){
	        var $this=$(this),
	            $td=$this.closest('td'),
	            $tr=$this.closest('tr'),
	            id=$td.attr('data-id'),
	            $tips=$('.global-tips'),
	            $p=$tips.find('p');
	        var params={
	            url:'order/delivery',
	            type:'put',
	            data:{id:id},
	            tokenFlag:true,
	            sCallback:function(res) {
	                if(res.code.toString().indexOf('2')==0){
	                   $tr.find('.order-status-txt')
	                       .removeClass('pay').addClass('done')
	                       .text('已发货');
	                    $this.remove();
	                    $p.text('操作成功');
	                }else{
	                    $p.text('操作失败');
	                }
	                $tips.show().delay(1500).hide(0);
	            },
	            eCallback:function(){
	                $p.text('操作失败');
	                $tips.show().delay(1500).hide(0);
	            }
	        };
	        window.base.getData(params);
	    });
	    
    };

    return new order();
})($)