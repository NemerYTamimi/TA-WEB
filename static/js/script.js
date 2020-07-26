

/* Please ❤ this if you like it! */


(function($) { "use strict";
    $("body").addClass("dark");
    $("#switch").addClass("switched");
    $(function() {
        var header = $(".start-style");
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();

            if (scroll >= 10) {
                header.removeClass('start-style').addClass("scroll-on");
            } else {
                header.removeClass("scroll-on").addClass('start-style');
            }
        });
    });

    //Animation

    $(document).ready(function() {
        $('body.hero-anime').removeClass('hero-anime');

    });

    //Menu On Hover

    $('body').on('mouseenter mouseleave','.nav-item',function(e){
        if ($(window).width() > 750) {
            var _d=$(e.target).closest('.nav-item');_d.addClass('show');
            setTimeout(function(){
                _d[_d.is(':hover')?'addClass':'removeClass']('show');
            },1);
        }
    });


})(jQuery);

window.onload=function () {
}
function loading() {
    document.getElementById('img').style.display='block';
}
function getInfo() {
    loading();
    document.getElementById('img').style.display='block';
    link=document.getElementById('url').value
    var ajax = new XMLHttpRequest();
    var method = "POST";
    var url = "/index";
    var asynchronous = true;
    ajax.open(method, url, asynchronous);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send('url='.concat(link));
    ajax.onreadystatechange = function () {
        if ((this.readyState == 4) && (this.status = 200)) {
            let result=document.getElementById("result")
            result.innerHTML = this.responseText;
        }
        document.getElementById('img').style.display='none';

    }
}
function download() {
    document.getElementById('img').style.display='block';
    var ajax = new XMLHttpRequest();
    var e = document.getElementById("selectres");
    var res = e.options[e.selectedIndex].value;
    var method = "POST";
    var url = "/downloads";
    var asynchronous = true;
    ajax.open(method, url, asynchronous);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send('res='.concat(res));
    ajax.onreadystatechange = function () {
        if ((this.readyState == 4) && (this.status = 200)) {
            a=document.createElement('div')
            a.className='linkclass'
            document.getElementById('result').append(a)
            a.innerHTML=this.responseText
        }
        document.getElementById('img').style.display='none';

    }
}
