import subprocess

from flask import Flask, render_template, request
from pytube import YouTube
import os.path
app = Flask(__name__)


@app.route('/',methods=['GET'])
def home():
    return render_template("index.html",script=f'<script>x=null</script>')


@app.route('/index',methods=['POST'])
def get_url():
    try:
        global yt,url
        url = request.form['url']
        print(url)
        yt = YouTube(url)
        str="<select name=resolutions id='selectres'>"
        for i in yt.streams.filter(file_extension='mp4',progressive='true'):
            str+=f"<option onclick='download();' value='{i.itag}'>Video(mp4){i.resolution}</option>"
        for i in yt.streams.filter(only_audio=True,file_extension='mp4'):
            str+=f"<option onclick='download();' value='{i.itag}'>Audio(mp3)</option>"
        str+="</select><button id='requestbtn' onclick='download();'>Request Download Link</button>"
        return str
    except:
            return '<a href="/">Something error <strong>click here </strong>to refresh the page</a> '



@app.route('/downloads', methods=['POST'])
def bpi():
    try:
        res = request.form['res']
        print(res)
        ys = yt.streams.get_by_itag(res)
        x=ys.title
        y=''
        for character in x:
            if character.isalnum():
                y += character
        x=''
        y+=str(res)
        ys.download("./static/downloads/",filename=y)
        if res=='140':
            ext='mp3'
            mp4 = "'%s'.mp4" % y
            mp3 = "'%s'.mp3" % y
            ffmpeg = ('ffmpeg -i %s ' % mp4 + mp3)
            subprocess.call(ffmpeg, shell=True)
        else:
            ext='mp4'

        a=f"<a id='download_link' href=./static/downloads/{y}.{ext} target='_blank' download >Download Your {ys.resolution} Video</a>"
        return a
    except:
        return '<a href="/">some thing error click here to refresh the page</a>'



if __name__ == '__main__':
    app.run(debug=True)
