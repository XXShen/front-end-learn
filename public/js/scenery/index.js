/*from tccdn minify at 2014-8-28 9:04:37,file：/cn/s/touch/2014/index/index.js*/
$(function () {
    var loadLabel;
    window.onpopstate = function (event) {
        if ((mIndex = window.location.href.indexOf("#")) <= 0 && window.location.href.substring(mIndex + 1) != "selects") {

//            $("#firstpage").slideDown();
            $("#secondpage").hide();
            $("#firstpage").show();
            
        }
    }
    //var userClosed = false; //用户是否手动关闭下载浮窗 cl 2014年3月5日11:15:38
    //$(".ofix .close").click(function () { userClosed = true; });

    $("#s_cNamepage1").click(function () {
        window.location.href = window.location.href + "#selects"
        $("#secondpage").show();
        $("#firstpage").hide();
       
        $(".search-spancancel").show();
        $(".input_span_after").click();
        var c = ($.browser.msie || window.opera || $.browser.mozilla) ? document.documentElement : document.body;
        setTimeout($.proxy(function () {
            var top = $(".d_search").position().top;
            lnk = document.getElementById("s_cName");
            c.scrollTop = 0;
        }, this), 0);

       // Fix.fixHide();
        //$("#s_cName").focus(); //cl 2014年3月4日16:32:11
        //$(".ofix").hide();
    });
    $("#morecity").click(function () {
        window.location.href = window.location.href + "#selects"
        $("#secondpage").show();
        $("#firstpage").hide();
        $("footer").hide();
        $("header").hide();
        $(".search-spancancel").show();
        $(".input_span_after").click();
        var c = ($.browser.msie || window.opera || $.browser.mozilla) ? document.documentElement : document.body;
        setTimeout($.proxy(function () {
            var top = $(".d_search").position().top;
            c.scrollTop = 0;
        }, this), 0);
    });
    $(".search-spancancel").click(function () {
        window.location.href = "javascript:history.go(-1);";
        $("#secondpage").hide();
        $("#firstpage").show();
        //if (!userClosed) { $(".ofix").show(); } //cl 2014年3月4日16:57:17 如果不是用户关闭的 继续显示
    });

    $(".xljt").click(function () {
        window.location.href = window.location.href + "#selects"
        $("#secondpage").show();
        $("#firstpage").hide();
        $("footer").hide();
        $("header").hide();

        $(".search-spancancel").show();
        $(".input_span_after").click();
        var c = ($.browser.msie || window.opera || $.browser.mozilla) ? document.documentElement : document.body;
        setTimeout($.proxy(function () {
            var top = $(".d_search").position().top;
            c.scrollTop = 0;
        }, this), 0);
    });

    //增信窗口弹出
    $("#hx").click(function () {
        $("#poper img").attr("src", "http://img1.40017.cn/touch/cn/scenery/search/zx.png?v=3");
        $("#poper img").attr("width", "269");
        $("#poper img").attr("height", "214");
        $("#poper").show();
        $(".poper").css({ "height": $(document).height() });
    });
    $("#poper").click(function () { $(this).hide(); });

    $("#zbjdbutt").click(function (e) {

        //初始化百度API
        clouda.lightInit({
            ak:"VzBqd6KlGdZ8uzMvl1QCFwWG",
            module:["app","geolocation"]//根据勾选的模块生成
        });
        var options = new Object();
        options.onsuccess = function (data) {
            console.log(1)
            successFunction(data);
        }
        options.onfail = function (err) {
            console.log(2)
            errorFunction(err);
        }

        setTimeout(function () {
            e.preventDefault();
            if ($("#dwxs").html() == "正在定位") return;
            if (navigator.geolocation) {
                $("#dwxs").html("正在定位");
//                navigator.geolocation.getCurrentPosition(successFunction, errorFunction, { timeout: 20000 });
                clouda.device.geolocation.get(options);//百度定位
            }
            _hmt.push(['_trackEvent', 'scenery-serarchNearyBy', 'click', 'touch']);
        }, 100);

        var successFunction = function (position) {
            var longitude = position.longitude,
                latitude = position.latitude,
                href = $("#s_cName").attr("fnearyByUrl");

            $.cookie("latitude", latitude);
            $.cookie("longitude", longitude);
            location.href = href;
            $("#searchCitys").hide();
        }, errorFunction = function (positionError) {
            if ($(".serarchNearyBy").size() > 0) {
                switch (positionError.code) {
                    case positionError.TIMEOUT: alert('地理位置服务连接超时'); break;
                    case positionError.PERMISSION_DENIED: alert('定位失败，请确保您的设备已打开定位功能或正常连接到网络'); break;
                    case positionError.POSITION_UNAVAILABLE: alert('浏览器无法获取您的位置信息'); break;
                    default:
                        alert('定位失败，请确保您的设备已打开定位功能或正常连接到网络');
                        break;
                }
                $("#searchCitys").hide();
            }
        };
    });

    $("#searchCitys").bind("mousedown", function (event) {
        event.preventDefault();
    });

    //初始化景点
    scenery = StorageHelp.GetStorage("scenery");
    if (scenery != "") {
    }

    //增信窗口弹出
    $("#hx").click(function () {
        $("#poper img").attr("src", "http://img1.40017.cn/touch/cn/scenery/search/zx.png?v=3");
        $("#poper img").attr("width", "269");
        $("#poper img").attr("height", "214");
        $("#poper").show();
        $(".poper").css({ "height": $(document).height() });
    });
    $("#poper").click(function () { $(this).hide(); });

    $(".p_search .search-span").bind("click", function (e) {
        var keyWord = $(".p_search #s_cName").val(), url = $("#s_cName").attr("furl");
        if (StringHandle.isValid(keyWord) == false) {
            alert("您输入的有非法关键词！");
            return false;
        }
        if (keyWord == "" || keyWord == "城市名/景点名/主题") {
            alert("请选择城市名或景点名称！");
        } else {
            keyWord = encodeURIComponent(keyWord);
            location.href = url.replace("{keyWord}", keyWord);
        }
    });

    //自动补填
    //    $("#s_cName").bind("focus", function () {
    //        var c = ($.browser.msie || window.opera || $.browser.mozilla) ? document.documentElement : document.body;
    //        setTimeout($.proxy(function () {
    //            var top = $(".d_search").position().top;
    //            c.scrollTop = top + 40;
    //        }, this), 0);
    //    });

    var loadLabel;
    $("#s_cName").bind("focus input", function () {
        if (StringHandle.isValid(this.value) == false) {
            return;
        }
        var params = StringHandle.trim(this.value),
        url = $(this).attr("more-labelUrl"),
        result = "";
        if (params != "") {
            $("#secondpage .d_search .p_search .input_span").css("border", "1px solid #FE932B");
            $(".input_span_after").show();
            if (loadLabel) {
                loadLabel.abort();
            };
            loadLabel = $.ajax({
                url: url,
                data: "keyword=" + params,
                dataType: "json",
                success: function (data) {
                    $(".search-span").show();
                    result += "<ul>";
                    if (data.CityList != null && data.CityList.length > 0) {
                        for (var i in data.CityList) {
                            result += "<li nohide = \"1\"><label>" + data.CityList[i] + "</label></li>";
                        }
                    }
                    else {
                        result += "<li nohide = \"1\"><label>" + params + "</label></li>";
                    }
                    result += "</ul>";

                    if (data.CityList.length > 2) {
                        $("#cityLeter").hide();
                    } else {
                        $("#cityLeter").hide();
                    }
                    $(".search-spancancel").hide();

                    $("#searchCitys").html(result).show();

                    $("#searchCitys li").click(function () {
                        var keyWord = $(this).find("label").html(), url = $("#s_cName").attr("furl");
                        keyWord = StringHandle.filterIllegal(keyWord);
                        $(".input_span_after").click();
                        keyWord = encodeURIComponent(keyWord);
                        StorageHelp.SetStorage("scenery", keyWord);
                        location.href = url.replace("{keyWord}", keyWord);
                        $(".search-spancancel").show();
                        $(".search-span").hide();
                        $("#searchCitys").hide();
                    })
                }
            });
        } else {
            $("#secondpage .d_search .p_search .input_span ").css("border", "1px solid #FE932B");
            $(".input_span_after").hide();
            if (this.value.replace(" ", "") == "") {
                if ($("#searchCitys .serarchNearyBy").html() != undefined && $("#searchCitys .serarchNearyBy").html() != "") {
                    $(".search-spancancel").hide();
                    $(".search-span").show();
                    $("#searchCitys").show();
                    $("#cityLeter").hide();
                }
                else {
                    $("#cityLeter").show();
                    $(".search-spancancel").show();
                    $(".search-span").hide();
                    $("#searchCitys").hide();
                }
            }
        }
    });

    $("#searchCitys").bind("mousedown", function (event) {
        event.preventDefault();
    });

    $("#s_cName").bind("blur", function () {
        $("#searchCitys").hide();
        $("#secondpage .d_search .p_search .input_span").css("border", "1px solid #dcdcdc");
    });

    $("form").submit(function () {
        if ($("#s_cName").val() == "") {
            return false;
        }
    })

    $(".input_span_after").click(function () {
        $(this).hide();
        $("#s_cName").val("");
        $(".search-spancancel").show();
        $(".search-span").hide();
        $("#cityLeter").show();
    });


    if ((mIndex = window.location.href.indexOf("#")) > 0 && window.location.href.substring(mIndex + 1) == "1") {
        //搜索
        setTimeout(function () {
            $("#s_cName").focus();
        }, 100);
    }
});
var StringHandle =
{
    illegalExpression: /[·~!@#$%^&*()_\\\/\-+\={}\[\];:'"\|,.<>?！￥…（）——｛｝【】；：‘“’”、《》，。、？]/,

    //是否合法 
    isValid: function (input) {
        if (typeof (input) == "string") {
            return !this.illegalExpression.test(input);
        }
        else {
            return false;
        }
    },

    //过滤非法字符
    filterIllegal: function (input) {
        if (typeof (input) == "string") {
            return input.replace(this.illegalExpression, '');
        }
        return input;
    },

    //Trim
    trim: function (input) {
        if (typeof (input) == "string") {
            return input.replace(/^[\s\t]+|[\s\t]+%/g, '');
        }
        return input;
    }
}

function Cityslbclick(obj, letter) {
    if (!$(obj).hasClass("rotate90")) {
        $("ul .rotate90").removeClass("rotate90");
        $(".fn-hide").hide();
        var result = "<p class=\"loading\">正在加载，请稍候...</p>";
        $(obj).addClass("rotate90");
        $("#" + letter).html(result).show();
        result = "";
        $.ajax({
            url: "/scenery/json/getcitysbyletter.html",
            data: "letter=" + letter,
            dataType: "json",
            success: function (data) {
                if (data.CityList != null && data.CityList.length > 0) {
                    var num = 1;
                    for (var i in data.CityList) {
                        result += "<li><label onclick=\"addinput(this,'" + data.CityList[i] + "',0)\" style=\"width:80%;display: inline-block; float:left\">" + data.CityList[i] + "</label><label onclick=\"addinput(this,'" + data.CityList[i] + "',1)\" style=\"float: right; color: #989898; margin-right: 10px; font-size: 24px;\">+</label></li>";
                    }
                }
                else {
                    result += "<p class=\"loading\">查无结果</p>";
                }
                $("#" + letter).html(result);
            }
        });
        var c = ($.browser.msie || window.opera || $.browser.mozilla) ? document.documentElement : document.body;
        setTimeout($.proxy(function () {
            var top = $("#" + letter).position().top;
            c.scrollTop = top + 6;
        }, this), 0);
    } else {
        $("#" + letter).html(result).slideUp();
        $(obj).removeClass("rotate90");
    }
}

function xljt() {
//    $(".title load").removeClass("rotate90");
}

function zmcityfun(obj, cityname) {
    furl = "/scenery/scenerylist_{keyWord}.html";
    cityname = StringHandle.filterIllegal(cityname);
    DataFn.setData("scenery", encodeURIComponent(cityname));
    var url = furl.replace("{keyWord}", encodeURIComponent(cityname));
    window.location.href = url;
}
//数据存取
var DataFn = {
    setData: function (key, value) {
        if (StorageHelp != null) {
            StorageHelp.SetStorage(key, value);
        }
    }
}

function addinput(obj, cityname, choice) {
    cityname = StringHandle.filterIllegal(cityname);
    if (choice.toString() == "0") {
        furl = "/scenery/scenerylist_{keyWord}.html";
        DataFn.setData("scenery", encodeURIComponent(cityname));
        var url = furl.replace("{keyWord}", encodeURIComponent(cityname));
        window.location.href = url;
    } else if (choice.toString() == "1") {
        $("#s_cName").val(decodeURIComponent(cityname));
        $("#s_cName").focus();
        if (!$.browser.chrome) {
            var c = ($.browser.msie || window.opera || $.browser.mozilla) ? document.documentElement : document.body;
            setTimeout($.proxy(function () {
                var top = $(".d_search").position().top;
                c.scrollTop = top;
            }, this), 0);
        }
    } else {
        cityname = $("#s_cName").val();
        cityname = StringHandle.filterIllegal(cityname);
        var furl = $(obj).attr("faction").replace("{keyword}", encodeURIComponent(cityname));
        DataFn.setData("scenery", encodeURIComponent(cityname));
        $(obj).attr("action", furl);
    }
}

function rmchclick() {
    if ($(".rmcslist").css("display").toString() == "none") {
//        $(".rmcslist").slideDown();
    } else {
//        $(".rmcslist").slideUp()
    }
}