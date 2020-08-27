

/* Please ❤ this if you like it! */


(function($) { "use strict";
    $("body").addClass("dark");
    $("#switch").addClass("switched");
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

window.onload = function () {
}
function loading() {
    document.getElementById('img').style.display = 'block';
}
function submit() {

}

submit = getInfo
function getInfo() {
    loading();
    document.getElementById('img').style.display = 'block';
    link = document.getElementById('url').value
    var ajax = new XMLHttpRequest();
    var method = "POST";
    var url = "/index";
    var asynchronous = true;
    ajax.open(method, url, asynchronous);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send('url='.concat(link));
    ajax.onreadystatechange = function () {
        if ((this.readyState == 4) && (this.status = 200)) {
            let result = document.getElementById("result")
            result.innerHTML = this.responseText;
        }
        document.getElementById('img').style.display = 'none';

    }
}

var files = document.getElementById('url').files;
document.getElementById('url').onchange = function (event) {
    files = document.getElementById('url').files;
}

function pdf2word() {
    loading();
    document.getElementById('img').style.display = 'block';
    var ajax = new XMLHttpRequest();
    var method = "POST";
    var url = "/uploader";
    files = document.getElementById('url').files
    var file = files[0]
    var asynchronous = true;
    ajax.open(method, url, asynchronous);
    ajax.setRequestHeader('Content-Type', 'multipart/form-data');
    var formData = new FormData();
    formData.append('file', file);
    ajax.send(formData)
    ajax.onreadystatechange = function () {
        if ((this.readyState == 4) && (this.status = 200)) {
            let result = document.getElementById("result")
            result.innerHTML = this.responseText;
        }
        document.getElementById('img').style.display = 'none';

    }
}
function word2pdf() {
    loading();
    document.getElementById('img').style.display = 'block';
    var ajax = new XMLHttpRequest();
    var method = "POST";
    var url = "/uploader1";
    files = document.getElementById('url').files
    var file = files[0]
    var asynchronous = true;
    ajax.open(method, url, asynchronous);
    ajax.setRequestHeader('Content-Type', 'multipart/form-data');
    var formData = new FormData();
    formData.append('file', file);
    ajax.send(formData)
    ajax.onreadystatechange = function () {
        if ((this.readyState == 4) && (this.status = 200)) {
            let result = document.getElementById("result")
            result.innerHTML = this.responseText;
        }
        document.getElementById('img').style.display = 'none';

    }
}
function download() {
    document.getElementById('img').style.display = 'block';
    var ajax = new XMLHttpRequest();
    var e = document.getElementById("selectres");
    var link = document.getElementById('url').value;
    var res = e.options[e.selectedIndex].value;
    var method = "POST";
    var url = "/downloads";
    var asynchronous = true;
    ajax.open(method, url, asynchronous);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send('res='.concat(res.concat('&url='.concat(link))));
    ajax.onreadystatechange = function () {
        if ((this.readyState == 4) && (this.status = 200)) {
            a = document.createElement('div')
            a.className = 'linkclass'
            document.getElementById('result').append(a)
            a.innerHTML = this.responseText
        }
        document.getElementById('img').style.display = 'none';

    }
}
function y_function() {
    document.getElementById('url').name = 'url';
    document.getElementById('url').type = 'text';
    document.getElementById('submit').innerText = 'GetInfo';
    submit = getInfo;
    document.getElementById('main_label').innerHTML = '<span>T</span><span>A</span><span>-</span><span>W</span><span>E</span><span>B</span><br>';
    document.getElementById('sub_label').innerHTML = '<span>Y</span><span>o</span><span>u</span><span>t</span><span>u</span><span>b</span><span>e</span><span> </span><span>D</span><span>o</span><span>w</span><span>n</span><span>l</span><span>o</span><span>a</span><span>d</span><span>e</span><span>r</span>';
    let formHTML = '<input id="url" type="text" name="url" placeholder="Enter Link here"><button id="submit" onclick="submit();">Get Info</button><div class="section vertical-center-row"><img src="/static/30.svg" id="img" style="display: none;margin-left: 50%;"></div><div id="result"></div>'
    document.getElementById('form').innerHTML = formHTML
    document.getElementById('op1').style = "background-color: royalblue;"
    document.getElementById('op2').style = "background-color: transparent;"
    document.getElementById('op3').style = "background-color: transparent;"
}
function pdf2word_function() {
    submit = pdf2word;
    document.getElementById('main_label').innerHTML = '<span>T</span><span>A</span><span>-</span><span>W</span><span>E</span><span>B</span><br>';
    document.getElementById('sub_label').innerHTML = '<span>P</span><span>D</span><span>F</span><span>-</span><span>T</span><span>o</span><span>-</span><span>W</span><span>o</span><span>r</span><span>d</span>'
    let formHTML = '<form method="post" action="/uploader" enctype="multipart/form-data"> <input id="url" type="file" name="file" placeholder="Choose file" accept="application/pdf"><button id="submit" onclick="submit();">Convert</button></form><div class="section vertical-center-row"><img src="/static/30.svg" id="img" style="display: none;margin-left: 50%;"></div><div id="result"></div>'
    document.getElementById('form').innerHTML = formHTML;
    document.getElementById('url').style = 'padding-top: 10px;padding-bottom: 30px;';
    document.getElementById('op1').style = "background-color: transparent;"
    document.getElementById('op2').style = "background-color: royalblue;"
    document.getElementById('op3').style = "background-color: transparent;"

}
function word2pdf_function() {
    submit = pdf2word;
    document.getElementById('main_label').innerHTML = '<span>T</span><span>A</span><span>-</span><span>W</span><span>E</span><span>B</span><br>';
    document.getElementById('sub_label').innerHTML = '<span>W</span><span>o</span><span>r</span><span>d</span><span>-</span><span>T</span><span>o</span><span>-</span><span>P</span><span>D</span><span>F</span>';
    let formHTML = '<form method="post" action="/uploader1" enctype="multipart/form-data"> <input id="url" type="file" name="file" placeholder="Choose file" accept".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"><button id="submit" onclick="submit();"accept="application/doc,application/docx">Convert</button></form><div class="section vertical-center-row"><img src="/static/30.svg" id="img" style="display: none;margin-left: 50%;"></div><div id="result"></div>'
    document.getElementById('form').innerHTML = formHTML;
    document.getElementById('url').style = 'padding-top: 10px;padding-bottom: 30px;';
    document.getElementById('op1').style = "background-color: transparent;"
    document.getElementById('op2').style = "background-color: transparent;"
    document.getElementById('op3').style = "background-color: royalblue;"


}

function about_function() {
    element = document.getElementsByClassName("section full-height")[0];
    element.className = 'about';
    element.innerHTML = '<section id="about"> <div class="container"> <div class="row"> <div class="col-md-5"> <div class="about-img"> <img class="shape" src="../static/about_tringle.png" alt=""> </div> </div> <br> <div class="col-md-7 about-right"> <h1 class="color-3"><b>About US</b> </h1><br> <p class="p-first text-white"> Ta-web is a site created in 2020, a site dedicated to converting files, whether word or pdf, and also for downloading videos and audios from YouTube. It was established after taking advantage of a course supervised by the Ministry of Communications - Palestine </p> <p class="text-white"> Greetings from TA site management </p> <h3 class="color-3 social-link-text" style="text-align: center;"> <button class="btn btn-danger" onclick="back()">Back to Home page</button> </h3> <script> function back() { window.location="../" } </script> </div> </div> </div></section>'
    document.body.style.backgroundImage = 'url(./static/pat-back.svg)';
}

function back() {

    window.location = "../";

}

function contactus_function() {
    element = document.getElementsByClassName("section full-height")[0];
    element.className = 'contactus';
    element.innerHTML = '<article class="letter"> <div class="side"> <h1>Contact us</h1> <p> <textarea placeholder="Your message"></textarea> </p> </div> <div class="side"> <p> <input type="text" placeholder="Your name"> </p> <p> <input type="email" placeholder="Your email"> </p> <p> <button id="sendLetter">Send</button> </p> </div> </article>'
    document.body.style.backgroundImage = 'url(./static/pat-back.svg)';
}

function addClass() {
    document.body.classList.add("sent");
}

sendLetter.addEventListener("click", addClass);


