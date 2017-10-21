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

        if(len <= 0)
            return;
        while(len--)
        {
            var urlArr = registerrs[len].url;
            if(!urlArr.length || registerrs[len].isLoad ){
                registerrs[len].func(argu);
                continue;
            }
            for(var i =0;i<urlArr.length;i++){
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
     * 需要改
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
    ScriptLoad.prototype.loads = function(url,callback) {
        if(typeof url == 'string'){
            this.load(url,callback);
            return true;
        }
        var count = 0;
        var len = url.length;
        for(var u in url){
            this.load(u,function(){
                count++;
                if(count == len){
                    callback()
                }
            })
        }

    };
    ScriptLoad.prototype.load = function(url,callback) {
        this.url = url;
        this.scriptArr[url]=true;
        //add new 
        if(this.scriptArr[url])
            return;
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
        this.get();
    };

    ScriptLoad.prototype.get = function(){
        if(this.url.slice(-2).toLowerCase()=='js'){
            this.js.src = this.url;
        }
        
    }
    return new ScriptLoad();
})()
    
