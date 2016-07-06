import PIL
from PIL import Image
import os



for image in os.listdir(os.path.dirname(os.path.abspath(__file__))):
	if ".jpg" in image:
		basewidth = 300
		img = Image.open(image)
		wpercent = (basewidth/float(img.size[0]))
		hsize = int((float(img.size[1])*float(wpercent)))
		img = img.resize((basewidth,hsize), PIL.Image.ANTIALIAS)
		img.save('thumbnails'+os.sep+'thumbnail_%s'%image.split(os.sep)[-1])