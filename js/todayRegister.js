var todayRegistModel = (function($){
	function register(){
		this.desktop = $('.desktop-main');

		this.emptyDestop();
	}

	register.prototype.init = function() {
		var str = '<div class="order-box todayRegister-box">'+
            '<table cellspacing="0" ng-show="docArr.length>0">'+
                '<thead>'+
                    '<tr>'+
                        '<td>用户id</td>'+
                        '<td>用户昵称</td>'+
                        '<td>注册时间</td>'+
                    '</tr>'+
                '</thead>'+
                '<tbody id="order-table">'+
                '</tbody>'+
            '</table>'+
            '<div class="todayRegister-load-more">点击加载更多</div>'+
            '<div class="todayRegister-no-more">没有更多了</div>'+
        '</div>'
		this.desktop.html(str);
	};

	register.prototype.emptyDestop = function(){
		this.desktop.empty();
	}

	register.prototype.bindEvent = function() {
		
	};
	return new register();
})($)