/**
 * Created by wangbiaozy on 2017/8/29.
 */
$(function () {
    //选项卡切换
    function tab($selector){
        var $lis = $selector.find('li');
        $lis.on('mouseover',function (){
            var $index = $(this).index();
            $(this).addClass('active').siblings().removeClass('active').end().parent().nextAll('div').eq($index).addClass('bg').siblings('div').removeClass('bg');
            $(this).children('div').addClass('active');
            $(this).siblings('li').children('div').removeClass('active');
        });
    }
    //左侧导航切换
    function navTab($selector) {
        var $lis = $selector.find('li');
        $lis.on('mouseover',function () {
            var $index = $(this).index();
            $(this).addClass('active').siblings().removeClass('active').end().children('div').addClass('bg').parent().siblings('li').children().removeClass('bg');
        });
        $lis.on('mouseout',function () {
            var $index = $(this).index();
            $(this).removeClass('active');
            $(this).children('div').removeClass('bg');
        });
    }
    $.each($('.recharge'),function (){
        tab($(this));
    });
    $.each($('.subNav'),function () {
        navTab($(this));
    });
    //banner下方滚动模块
    (function () {
        var $slideBox = $(".slideBox"),
            $ul = $slideBox.find("ul"),
            oneWidth = $slideBox.find('ul li').eq(0).width()+13,
            timer = null,
            flag = true;
        //向左滚动
        function scroll() {
            $ul.animate({
                left: -oneWidth
            },function () {
                $ul.find('li').eq(0).appendTo($ul);
                $ul.css('left','0');
            });
        }
        //向右滚动
        function scrollToRight() {
            $ul.animate({
                left: 0
            });
        }
        timer = setInterval(scroll,2000);
        //鼠标离开继续滚动
        $slideBox.on('mouseout',function () {
            timer = setInterval(scroll,2000);
        });
        //鼠标移入悬停
        $slideBox.on('mouseover',function(){
            clearInterval(timer);
        });
        //左右按钮切换
        $('.prev').on('click',function () {
            if(flag){
                flag = false;
                $ul.find('li').eq(7).prependTo($ul);
                $ul.css('left',-oneWidth);
                scrollToRight();
                setTimeout(function () {
                    flag = true;
                },500);
            }
        });
        $('.next').on('click',function () {
            if(flag){
                flag = false;
                scroll();
                setTimeout(function () {
                    flag = true;
                },500);
            }
        });
        //鼠标经过每个Li选中样式
        $ul.on('mouseover','li',function () {
            var $this =$(this);
            $this.addClass('active');
        });
        $ul.on('mouseout','li',function () {
            $(this).removeClass('active');
        });
    })();

    //宽带新装隐藏档位弹出
    (function () {
        var $selected = $('.main.broadband .content>div:first-child');
        $selected.on('mouseover',function () {
            $('.hideBox').slideDown();
        });
        $('.hideBox').on('mouseleave',function () {
            $('.hideBox').slideUp();
        });
    })();

    //底部浮层展开收起
    (function () {
        $('.shrink').on('click',function () {
            $(this).animate({
                width: 0,
            },function () {
                $('.two-bar-codes').animate({
                    left: '0',
                },800);
            });
        });
        $('.two-bar-codes>span').on('click',function () {
            $('.two-bar-codes').animate({
                left: '-110%',
            },800,function () {
                $('.shrink').animate({
                    width: '41px',
                });
            });
        });
    })();
    
    //右侧楼层及回到顶部
    $(document).scroll(function() {
			if($(document).scrollTop() >= 469) {
				$(".jumpBox").fadeIn(500);
				var i = Math.floor(($(document).scrollTop() - 469) / 419);
				$(".jumpBox ul li").eq(i).addClass("active");
				$(".jumpBox ul li").eq(i).siblings().removeClass("active")}else{
				$(".jumpBox").fadeOut(333);
			}
		})
		
		
		$(".jumpBox ul li").not(".last").click(function() {
			$("body,html").animate({ "scrollTop": $(this).index() * 419 + 469 }, 500);
		})
		
		$(".jumpBox ul .last").click(function(){
			$("body").animate({ "scrollTop":0 },500);
		})
});