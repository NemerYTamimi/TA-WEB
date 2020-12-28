// ==UserScript==
// @name        TA-WEB Converter Button
// @namespace   https://y2mate.com/
// @version     1.5
// @date        2020-12-23
// @author      Nemer Tamimi
// @description TA-WEB Downloader: Download Video and Audio for free
// @homepage    http://www.ta-pal.com/
// @icon        http://www.ta-pal.com/static/apple-touch-icon.png
// @icon64      http://www.ta-pal.com/static/favicon.ico
// @updateURL   http://www.ta-pal.com/static/helper.meta.js
// @downloadURL http://www.ta-pal.com/static/helper.user.js
// @include     http://*
// @include     https://*
// @run-at      document-end
// @grant       GM_listValues
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @grant       GM_info
// @grant       GM_openInTab
// @grant       GM_setClipboard
// @grant       GM_registerMenuCommand
// @grant       GM_unregisterMenuCommand
// @grant       GM_notification
// @grant       GM_download
// @grant       GM.info
// @grant       GM.listValues
// @grant       GM.setValue
// @grant       GM.getValue
// @grant       GM.deleteValue
// @grant       GM.openInTab
// @grant       GM.setClipboard
// @grant       GM.xmlHttpRequest
// @connect     youtube.com
// @connect     m.youtube.com
// @connect     www.youtube.com
// @connect     youtube-nocookie.com
// @connect     youtu.be
// @connect     www.ta-pal.com
// @connect     self
// @connect     *
// ==/UserScript==
var AKoiMain = {
    oXHttpReq: null,
    vid: null,
    oldUrl: null,
    DocOnLoad: function(o) {
        try {
            if (null != o && null != o.body && null != o.location && (AKoiMain.vid = AKoiMain.getVid(o), AKoiMain.vid)) {
                o.querySelector("#info-contents #info").setAttribute("style", "flex-wrap: wrap;");
                var t = o.querySelector("#menu-container"),
                    e = o.querySelector("#tawebDownloader"),
                    n = AKoiMain.GetCommandButton();
              		b = AKoiMain.GetCommandButton1();
                null == e && (null != t ? t.parentNode.insertBefore(n, t) : (t = o.querySelector("#eow-title")).parentNode.insertBefore(n, t)), AKoiMain.oldUrl = o.location.href, AKoiMain.checkChangeVid()
                null == e && (null != t ? t.parentNode.insertBefore(b, t) : (t = o.querySelector("#eow-title")).parentNode.insertBefore(b, t)), AKoiMain.oldUrl = o.location.href, AKoiMain.checkChangeVid()
            }
            return !0
        } catch (o) {
            console.log(" taweb.DocOnLoad. ", o)
        }
    },
    checkChangeVid: function() {
        setTimeout(function() {
            AKoiMain.oldUrl == window.location.href ? AKoiMain.checkChangeVid() : AKoiMain.WaitLoadDom(window.document)
        }, 1e3)
    },
    WaitLoadDom: function(o) {
        AKoiMain.vid = AKoiMain.getVid(o), AKoiMain.vid ? null != o.querySelector("#info #menu-container") ? AKoiMain.DocOnLoad(o) : setTimeout(function() {
            AKoiMain.WaitLoadDom(o)
        }, 1e3) : AKoiMain.checkChangeVid()
    },
    goTotaweb: function(o) {
        try {
            var t = "http://www.ta-pal.com/api/youtube/chrome?url=https://www.youtube.com/watch?v=" + AKoiMain.vid + "&itag=18";
            window.open(t, "_blank")
        } catch (o) {
            console.log(" taweb.OnButtonClick. ", o)
        }
    },
      goTotaweb1: function(o) {
        try {
            var t = "http://www.ta-pal.com/api/youtube/chrome?url=https://www.youtube.com/watch?v=" + AKoiMain.vid + "&itag=140";
            window.open(t, "_blank")
        } catch (o) {
            console.log(" taweb.OnButtonClick. ", o)
        }
    },
    GetCommandButton: function() {
        try {
            var o = document.createElement("button");
            var o1 = document.createElement("button");
            return o.id = "tawebDownloader", o.className = "yt-uix-tooltip", o.setAttribute("type", "button"), o.setAttribute("title", "Download with ta-pal.com"), o.innerHTML = "Download MP4", o.addEventListener("click", function(o) {
                AKoiMain.goTotaweb(o)
            }, !0), o.setAttribute("style", "min-height:25px; position:relative; top:1px; cursor: pointer; font: 13px Arial; background: #ff003e; color: #fff; text-transform: uppercase; display: block; padding: 10px 16px; margin: 20px 5px 10px 5px; border: 1px solid #ff0068; border-radius: 2px; font-weight:bold"), o.setAttribute("onmouseover", "this.style.backgroundColor='#c10841'"), o.setAttribute("onmouseout", "this.style.backgroundColor='#ff003e'"), o
        } catch (o) {
            console.log(" taweb.GetCommandButton. ", o)
        }
    },
  GetCommandButton1: function() {
        try {
            var o1 = document.createElement("button");
            return o1.id = "tawebDownloader1", o1.className = "yt-uix-tooltip", o1.setAttribute("type", "button1"), o1.setAttribute("title", "Download with ta-pal.com"), o1.innerHTML = "Download MP3", o1.addEventListener("click", function(o1) {
                AKoiMain.goTotaweb1(o1)
            }, !0), o1.setAttribute("style", "min-height:25px; position:relative; top:1px; cursor: pointer; font: 13px Arial; background: #ff003e; color: #fff; text-transform: uppercase; display: block; padding: 10px 16px; margin: 20px 5px 10px 5px; border: 1px solid #ff0068; border-radius: 2px; font-weight:bold"), o1.setAttribute("onmouseover", "this.style.backgroundColor='#c10841'"), o1.setAttribute("onmouseout", "this.style.backgroundColor='#ff003e'"), o1
        } catch (o1) {
            console.log(" taweb.GetCommandButton1. ", o1)
        }
    },
    getVid: function(o) {
        var t = o.location.toString().match(/^.*((m\.)?youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/);
        return !(!t || !t[3]) && t[3]
    }
};
AKoiMain.WaitLoadDom(window.document);
