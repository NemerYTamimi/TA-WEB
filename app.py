import subprocess

from flask import Flask, render_template, request, flash, url_for
from pytube import YouTube
from shutil import copyfile
import groupdocs_conversion_cloud

import os

from werkzeug.utils import secure_filename

app = Flask(__name__)

# Get your app_sid and app_key at https://dashboard.groupdocs.cloud (free registration is required).
app_sid = "2b861515-ac5b-4264-84aa-0df3f95c0596"
app_key = "d35894bb7edb207cae4ff9da4b9931c2"

# Create instance of the API
convert_api = groupdocs_conversion_cloud.ConvertApi.from_keys(app_sid, app_key)
file_api = groupdocs_conversion_cloud.FileApi.from_keys(app_sid, app_key)
UPLOAD_FOLDER = './static/uploads'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx'}


@app.route('/', methods=['GET'])
def home():
    return render_template("index.html")

@app.route('/google4e850c9deb377567.html', methods=['GET'])
def google():
    return render_template("google4e850c9deb377567.html")

@app.route('/index', methods=['POST'])
def get_url():
    try:
        global yt, url
        url = request.form['url']
        print(url)
        yt = YouTube(url)
        str = "<select name=resolutions id='selectres'>"
        for i in yt.streams.filter(file_extension='mp4', progressive='true'):
            str += f"<option onclick='download();' value='{i.itag}'>Video(mp4){i.resolution}</option>"
        for i in yt.streams.filter(only_audio=True, file_extension='mp4'):
            str += f"<option onclick='download();' value='{i.itag}'>Audio(mp3)</option>"
        str += "</select><button id='requestbtn' onclick='download();'>Request Download Link</button>"
        return str
    except:
        return '<a href="#">Something error please check url and try again</a> '


@app.route('/downloads', methods=['POST'])
def downlaod():
    try:
        res = request.form['res']
        url = request.form['url']
        yt = YouTube(url)
        print(res)
        ys = yt.streams.get_by_itag(res)
        x = ys.title
        y = ''
        for character in x:
            if character.isalnum():
                y += character
            else:
                y+='_'

        x = ''
        y += str(res)
        print(y)

        ys.download("./static/downloads/", filename=y)
        filename = f"./static/downloads/{y}.mp4"
        resolution = ys.resolution
        if ys.itag == 140:
            thisFile = f"./static/downloads/{y}.mp4"
            targetFile=f"./static/downloads/{y}.mp3"
            os.rename(thisFile, targetFile)
            filename=targetFile
            type = 'Audio'
            resolution = '128kbps'
        else:
            type = 'Video'
        a = f"<a id='download_link' href={filename} target='_blank' download >Download {resolution} {type}</a>"
        return a
    except:
        return '<a href="#">Something error please click button to try again</a>'


@app.route('/upload')
def upload_file1():
    return render_template('upload.html')


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/uploader', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            return 'No file part'
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            return 'No selected file'
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            output_name = filename.rsplit('.', 1)[0] + '.doc'
            output_file = f"./static/downloads/{output_name}"
            uploaded_file = f"./static/uploads/{filename}"
            print(uploaded_file)
            pdf2doc(filename, uploaded_file, output_file, output_name)
            return f"<a id='download_link' href={output_file} target='_blank' download >Download </a>"


def pdf2doc(file, filename, output_file, output_name):
    try:

        # upload soruce file to storage

        remote_name = file
        strformat = 'doc'
        request_upload = groupdocs_conversion_cloud.UploadFileRequest(remote_name, filename)
        response_upload = file_api.upload_file(request_upload)
        # Convert PDF to Word document
        settings = groupdocs_conversion_cloud.ConvertSettings()
        settings.file_path = remote_name
        settings.format = strformat
        settings.output_path = output_name

        loadOptions = groupdocs_conversion_cloud.PdfLoadOptions()
        # Convert PDF to Word document
        settings = groupdocs_conversion_cloud.ConvertSettings()
        settings.file_path = remote_name
        settings.format = strformat
        settings.output_path = output_name

        loadOptions = groupdocs_conversion_cloud.PdfLoadOptions()
        loadOptions.hide_pdf_annotations = True
        loadOptions.remove_embedded_files = False
        loadOptions.flatten_all_fields = True

        settings.load_options = loadOptions

        convertOptions = groupdocs_conversion_cloud.DocxConvertOptions()
        convertOptions.from_page = 1
        convertOptions.pages_count = 10

        settings.convert_options = convertOptions

        request = groupdocs_conversion_cloud.ConvertDocumentRequest(settings)
        response = convert_api.convert_document(request)

        print("Document converted successfully: " + str(response))
        # upload source file to storage

        request_download = groupdocs_conversion_cloud.DownloadFileRequest(output_name)
        response_download = file_api.download_file(request_download)
        copyfile(response_download, f"./{output_file}")

    except groupdocs_conversion_cloud.ApiException as e:
        print("Exception when calling get_supported_conversion_types: {0}".format(e.message))
    return render_template("index.html", script=f'<script>x=null</script>')


@app.route('/uploader1', methods=['GET', 'POST'])
def upload_file2():
    if request.method == 'POST':
        print(request.form)
        # check if the post request has the file part
        if 'file' not in request.files:
            return 'No file part'
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            return 'No selected file'
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            output_name = filename.rsplit('.', 1)[0] + '.pdf'
            output_file = f"./static/downloads/{output_name}"
            uploaded_file = f"./static/uploads/{filename}"
            doc2pdf(filename, uploaded_file, output_file, output_name)
            return f"<a id='download_link' href={output_file} target='_blank' download >Download </a>"
        return "error"



def doc2pdf(file, filename, output_file, output_name):
    request_upload = groupdocs_conversion_cloud.UploadFileRequest(file, filename)
    response_upload = file_api.upload_file(request_upload)
    # Create necessary API instances
    apiInstance = groupdocs_conversion_cloud.ConvertApi.from_keys(app_sid, app_key)

    # Prepare convert settings
    settings = groupdocs_conversion_cloud.ConvertSettings()
    settings.file_path = file
    settings.format = "pdf"

    load_options = groupdocs_conversion_cloud.DocxLoadOptions()
    load_options.password = "password"
    convert_options = groupdocs_conversion_cloud.PdfConvertOptions()
    convert_options.center_window = True
    convert_options.compress_images = False
    convert_options.display_doc_title = True
    convert_options.dpi = 1024.0
    convert_options.fit_window = False
    convert_options.from_page = 1
    convert_options.grayscale = False
    convert_options.image_quality = 100
    convert_options.linearize = False
    convert_options.margin_top = 5
    convert_options.margin_left = 5
    convert_options.unembed_fonts = True
    convert_options.remove_unused_streams = True
    convert_options.remove_unused_objects = True
    convert_options.remove_pdfa_compliance = False

    settings.load_options = load_options
    settings.convert_options = convert_options
    settings.output_path = "converted"
    result = apiInstance.convert_document(groupdocs_conversion_cloud.ConvertDocumentRequest(settings))
    request_download = groupdocs_conversion_cloud.DownloadFileRequest(f"converted/{output_name}")
    response_download = file_api.download_file(request_download)
    copyfile(response_download, f"./{output_file}")
    # Convert
    return render_template("index.html", script=f'<script>x=null</script>')


@app.route('/pdf2doc', methods=['GET'])
def pdf2doc_page():
    return render_template("index.html", script="document.onload=pdf2word_function();")


@app.route('/doc2pdf', methods=['GET'])
def doc2pdf_page():
    return render_template("index.html", script="document.onload=word2pdf_function();")


@app.route('/ytd', methods=['GET'])
def youtube_page():
    return render_template("index.html", script="document.onload=y_function();")

@app.route('/contactus',methods=['GET'])
def contact():
    return render_template("contactus.html")

@app.route('/aboutus',methods=['GET'])
def about():
    return render_template("index.html",script="document.onload=about_function();")

@app.route('/comingsoon',methods=['GET'])
def coming():
    return render_template("comingsoon.html")
if __name__ == '__main__':
    app.run(debug=True)
