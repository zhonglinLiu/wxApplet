$(function(){

    if(!window.base.getLocalStorage('token')){
        window.location.href = 'login.html';
    }

    /*退出*/
    $(document).on('click','#login-out',function(){
        window.base.deleteLocalStorage('token');
        window.location.href = 'login.html';
    });

    window.onload = function(){
        var url = window.location.hash.substring(1);
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        //注册路由
        Route.register('/home',function(){
            homeModel.init();
        })

        Route.register('/order',function(){
            orderModel.init();
        },['../js/order.js']);

        Route.register('/category',function(){
            categoryModel.init();
        },['../js/category.js','../css/category/category.css'])

        Route.register('/todayRegister',function(){
            todayRegistModel.init();
        },['../js/todayRegister.js','../css/home/todayRegister.css']);

        Route.register('/category?id=:id&catename=:catename',function(params){
            categeryProductsModel.init(params);
        },['../js/categeryProducts.js','../css/category/categoryProductt.css']);

        Route.register('/product',function(){
            productModel.init();
        },['../css/product/product.css','../js/product.js']);

        Route.register('/product?size=:size&page=:page',function(params){
            productModel.init(params);
        },['../css/product/product.css','../js/product.js']);
        Route.register('/product/add',function(){
            proaddModel.init();
        },['../js/productAdd.js',
            '../js/webuploader/0.1.5/webuploader.css','../js/webuploader/0.1.5/webuploader.js',
            '../js/upload/upload.js','../js/upload/uploadImg.css','../css/product/add.css'
        ])
        Route.register('/product/addImage?product_id=:product_id',function(params){
            proaddModel.initProductImg(params);
        },['../js/productAdd.js',
            '../js/webuploader/0.1.5/webuploader.css','../js/webuploader/0.1.5/webuploader.js',
            '../js/upload/upload.js','../js/upload/uploadImg.css','../css/product/add.css'
        ])

        Route.register('/product?product_id:product_id',function(params){
            proaddModel.editProductInit(params);
        },['../js/productAdd.js',
            '../js/webuploader/0.1.5/webuploader.css','../js/webuploader/0.1.5/webuploader.js',
            '../js/upload/upload.js','../js/upload/uploadImg.css','../css/product/add.css'
        ])

        Route.register('/product/addProperty?product_id=:product_id',function(params){
            proaddModel.initProductProperty(params);
        },['../js/productAdd.js','../css/product/add.css']);

        Route.register('/product/editImgs?product_id=:product_id',function(params){
            productImgSort.init(params);
        },['../js/productImgSort.js','../css/product/add.css']);

        Route.register('/product/showBigImg?url=:url',function(params){
            productImgSort.initShowBigImg(params);
        },['../js/productImgSort.js','../css/product/add.css']);

        Route.register('/theme',function(){
            themeModel.init();
        },['../js/theme.js','../css/theme/theme.css']);

        Route.register('/theme?id=:id',function(params){
            themeProductsModel.init(params);
        },['../js/themeProducts.js','../css/theme/themeProducts.css']);

        //路由别名
        Route.alias["!product?size=:size&page=:page"] = '/product?size=:size&page=:page';
        if(!url){
            window.location.hash = '#/home';
        }
        Route.routeMatch();
        
    }

    

    //锚点跳转后触发的事件
    window.onhashchange = function(){
        window.base.public();
    }

    window.base.public = function(){
        Route.routeMatch()
        window.onscroll = null
    }


    var list = $(".leftbar-item a");
    $('.leftbar-item').delegate('a','mouseup',function(){
        for(var i=0;i<list.length;i++){
            $(list[i]).removeClass('active');
        }
        $(this).addClass('active');
    })

});

function stopScroll(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}


//观察者模式 用于注册全局路由
var Route = (function(){
    var subUid = -1;
    function Route(){
        //路由别名
        this.alias = [];
    };
    Route.topics = [];
    Route.prototype.public = function(topic,argu) {
        this.stopScroll();
        if(!Route.topics[topic]){
            return false;
        }
        var registerrs = Route.topics[topic],
            len = registerrs ? registerrs.length : 0;

        var index = layer.load(0, {time: 10000});
        while(len--)
        {
            var urlArr = registerrs[len].url;
            var loadedNum = 0;
            if(!urlArr.length || registerrs[len].isLoad ){
                registerrs[len].func(argu);
                layer.close(index);
                continue;
            }
            for(var i =0;i<urlArr.length;i++){
                if(ScriptLoad.scriptArr[urlArr[i]]){
                    loadedNum+=1;
                    if(loadedNum==urlArr.length)
                    {
                        layer.close(index);
                        loadedNum = false;
                        registerrs[len].isLoad = true;
                        registerrs[len].func(argu);
                    }
                    continue;
                }
                
                if(urlArr[i].slice(-3).toLowerCase()=='css'){
                    loadedNum++
                }
                if( !!registerrs[len].url ){
                    ScriptLoad.load(urlArr[i],function()
                    {
                        loadedNum++;
                        if(loadedNum==urlArr.length)
                        {
                            layer.close(index);
                            loadedNum = false;
                            registerrs[len].isLoad = true;
                            registerrs[len].func(argu);
                        }
                    });
                    ScriptLoad.get();
                }
                else
                {
                    registerrs[len].func(argu);
                }
            }
            if(len<=0){
                break;
            }
        }
    };

    /**
     * [register 注册路由]
     * @param  {[string]} topic [路由别名]
     * @param  {[object]} func  [需要执行的类或方法]
     * @param  {[array]} url   [依赖的js和css文件路径]
     * @return {[string]}       [路由id号]
     */
    Route.prototype.register  = function(topic,func,url) {
        if(!Route.topics[topic]){
            Route.topics[topic] = [];
        }
        var token = (++subUid).toString();
        Route.topics[topic].push({
            token:token,
            func:func,
            isLoad: false,
            url: !!url ? url : []
        });
        return token
    };

    /**
     * [unregister 通过路由id号销毁路由]
     * @param  {[type]} token [路由id号]
     * @return {[type]}       [description]
     */
    Route.prototype.unregister = function(token) {
        for(var i in Route.topics){
            if( (Route.topics[i]) ){
                for(var k in Route.topics[i]){
                    if(Route.topics[i][k].token == token){
                        Route.topics[i].splice(k,1);
                        return true;
                    }
                }
            }
        }
    };

    /**
     * [routeMatch 路由匹配]
     * @return {[type]} [description]
     */
    Route.prototype.routeMatch = function() {
        //category?id=123
        //category?id=:id
        var url = window.location.hash.substring(1);
        var rg = /(.*\?)(.*)$/;
        var rgArr = rg.exec(url);
        if(rgArr==null){
            var url = this.alias[url] ? this.alias[url] : url;
            this.public(url,[]);
            return true;
        }
        var prefix = rgArr[1];
        var arr = rgArr[2].split('&');
        var paramsArr = [];
        var paramsArr = {};
        for(var k in arr){
            var temp = arr[k].split('=');
            paramsArr[temp[0]]=temp[1];
        }
        var paramsStr = '';
        for(var k in paramsArr){
            if(!paramsArr[k])
                continue;
            paramsStr+=k+'=:'+k+'&';
        }
        paramsStr = paramsStr.slice(0,-1);
        paramsStr = prefix+paramsStr;
        var paramsStr = this.alias[paramsStr] ? this.alias[paramsStr] : paramsStr;
        console.log(paramsStr);
        return this.public(paramsStr,paramsArr);

    };

    Route.prototype.stopScroll = function() {
        window.onscroll = stopScroll;
        setTimeout(function(){
            window.onscroll = null
        },60)
    };
    return new Route();
})()


//js/css 自动加载
var ScriptLoad = (function(){
    function ScriptLoad(){
        this.scriptArr = [];
    }
    ScriptLoad.prototype.load = function(url,callback) {
        this.url = url;
        this.scriptArr[url]=1;
        if(url.slice(-2).toLowerCase()=='js'){
            var js = document.createElement("script");
            this.js = js;
            js.setAttribute("type",'text/javascript');
            var head = document.getElementsByTagName('head')[0];
            head.appendChild(js);
            if(navigator.appName.toLowerCase().indexOf('netscape') == -1){
                js.onreadystatechange = function(){
                    if(js.readyState == 'complete'){
                        callback();
                    }
                }
            }else{
                js.onload = function(){
                    callback();
                }
            }
        }else{
            var link = document.createElement("link");
            link.setAttribute("type",'text/css');
            link.setAttribute("rel",'stylesheet');
            link.setAttribute('href',this.url);
            document.getElementsByTagName("head")[0].appendChild(link);
        }
    };

    ScriptLoad.prototype.get = function(){
        if(this.url.slice(-2).toLowerCase()=='js'){
            this.js.src = this.url;
        }
        
    }
    return new ScriptLoad();
})()
    
