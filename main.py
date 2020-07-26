import os

from pytube import YouTube


# #ask for the link from user
# link = input("Enter the link of YouTube video you want to download:  ")
# yt = YouTube(link)
#
# #Showing details
# print("Title: ",yt.title)
# print("Number of views: ",yt.views)
# print("Length of video: ",yt.length)
# print("Rating of video: ",yt.rating)
# #Getting the highest resolution possible
# ys = yt.streams.get_highest_resolution()
#
# #Starting download
# print("Downloading...")
# ys.download()
# print("Download completed!!")

def ydawnloader(url):
    object = YouTube(url)
    return object


yt = YouTube("https://www.youtube.com/watch?v=cMYGLYM135k")
print(yt.streams.filter(only_audio=True,file_extension='mp4').all())