from PIL import Image, ImageDraw, ImageFont, ImageOps
from pathlib import Path
import subprocess, shutil, random, sys

root = Path(__file__).resolve().parents[1]
ff = root / '.tools/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe'
original = root / '.tools/Beyond-Earth-demo-original.mp4'
target = root / 'submission/Beyond-Earth-demo.mp4'
if not original.exists() or '--refresh-source' in sys.argv:
    shutil.copy2(target, original)
w, h = 1200, 800
im = ImageOps.fit(Image.open(root / 'public/media/hero.jpg').convert('RGB'), (w, h))
veil = Image.new('RGBA', (w, h))
d = ImageDraw.Draw(veil)
for y in range(h):
    d.line((0, y, w, y), fill=(3, 10, 19, 185 + int(35 * abs(y-h/2)/(h/2))))
im = Image.alpha_composite(im.convert('RGBA'), veil)
d = ImageDraw.Draw(im)
random.seed(19)
for _ in range(75):
    x, y = random.randrange(w), random.randrange(h)
    d.ellipse((x, y, x+1, y+1), fill=(170, 186, 202, 115))
serif = ImageFont.truetype(str(root/'public/fonts/newsreader.ttf'), 100)
sans = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 19)
small = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 17)
d.text((600, 278), 'B E Y O N D   E A R T H', font=sans, anchor='mm', fill='#bac8d5')
d.text((600, 393), 'Thank you.', font=serif, anchor='mm', fill='#f6f0e4')
d.line((555, 485, 645, 485), fill='#d8b88c', width=2)
d.text((600, 535), 'Keep exploring.', font=sans, anchor='mm', fill='#e2d8c8')
d.text((600, 735), 'SpaceTime  /  LancerHacks', font=small, anchor='mm', fill='#a0aebb')
card = root / 'submission/thank-you.png'
im.convert('RGB').save(card)
out = root / '.tools/demo-with-ending.mp4'
filters = '[0:v]fps=30,setsar=1,format=yuv420p,fade=t=out:st=95.5:d=0.5[v0];[1:v]fps=30,setsar=1,format=yuv420p,fade=t=in:st=0:d=0.7,fade=t=out:st=4.4:d=0.6[v1];[v0][v1]concat=n=2:v=1:a=0[v];[2:a]volume=0.18,afade=t=in:st=0:d=2,afade=t=out:st=97:d=4[a]'
args = [str(ff), '-y', '-v', 'error', '-i', str(original), '-loop', '1', '-t', '5', '-i', str(card), '-i', str(root/'public/audio/space-1990.mp3'), '-filter_complex', filters, '-map', '[v]', '-map', '[a]', '-t', '101', '-c:v', 'libx264', '-preset', 'fast', '-crf', '22', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', str(out)]
subprocess.run(args, check=True)
shutil.copy2(out, target)
subprocess.run([str(ff), '-v', 'error', '-ss', '98', '-i', str(target), '-frames:v', '1', '-y', str(root/'previews/demo-ending-check.png')], check=True)
check = subprocess.run([str(ff), '-i', str(target)], capture_output=True, text=True)
print(next(line.strip() for line in check.stderr.splitlines() if 'Duration:' in line))
print(target)
