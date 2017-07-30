var homeModel = (function($){

	function home (){
		this.desktop = $('.desktop-main');
		this.sourcesLoad = false;
		// this.emptyDestop();
	}

	home.prototype.init = function(){
		var _this = this;
		this.renderUI();
		this.bindEvent();
	}
	home.prototype.renderUI = function() {
		var str = 
		'<ul class="home-box">'+
            '<li>'+
                '<div ><i class="iconfont icon-user"  ></i></div>'+
                '<a id="todayRegister" href="#/todayRegister" ><div class="text" >今日注册用户</div></a>'+
            '</li>'+
            '<li>'+
                '<div ><i class="iconfont icon-list"  ></i></div>'+
                '<a id="todaySale" href="#/todaySale"> <div class="text" >今日销售额</div> </a>'+
            '</li>'+
            '<li>' +
            	'<div ><i class="iconfont icon-list"  ></i></div>'+
                '<a id="todaySale" href="#/todaySale"> <div class="text" >销量走势</div> </a>'+
            '</li>'+
            '<li>'+
            '</li>'+
        '</ul>';
		this.desktop.html(str);

	};




	home.prototype.emptyDestop = function(){
		this.desktop.empty();
	}
	home.prototype.bindEvent = function() {

		$('#todayRegister').on('click',function(){
			pubsub.public('todayRegister');
		})
		$('#todaySale').on('click',function(){
			pubsub.public('todaySale');
		})
	};
	return new home;
})($)
