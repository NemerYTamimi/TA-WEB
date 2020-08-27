import os, time, sys

path = r'/home/TAWEB/static/downloads'
os.chdir(path)
now = time.time()

for f in os.listdir(path):

 if os.stat(f).st_mtime < now -  1* 21600:

  if os.path.isfile(f):

   os.remove(os.path.join(path, f))

