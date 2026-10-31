import sys,subprocess,pathlib
sys.path.insert(0,'.tools');import imageio_ffmpeg
f=imageio_ffmpeg.get_ffmpeg_exe()
args=[f,'-y','-f','concat','-safe','0','-i','.tools/demo-frames/frames.txt','-i','public/audio/space-1990.mp3','-t','96','-vf','fps=30,format=yuv420p','-c:v','libx264','-preset','fast','-crf','22','-af','volume=0.18,afade=t=in:st=0:d=2,afade=t=out:st=92:d=4','-c:a','aac','-b:a','128k','-movflags','+faststart','submission/Beyond-Earth-demo.mp4']
r=subprocess.run(args,capture_output=True,text=True)
if r.returncode:raise RuntimeError(r.stderr[-2000:])
subprocess.run([f,'-y','-i','submission/Beyond-Earth-demo.mp4','-vf','fps=1/12,scale=360:-1,tile=3x3','-frames:v','1','previews/project-demo-sheet.jpg'],capture_output=True)
r=subprocess.run([f,'-i','submission/Beyond-Earth-demo.mp4'],capture_output=True,text=True)
print(next(x for x in r.stderr.splitlines() if 'Duration:' in x));print('Bytes',pathlib.Path('submission/Beyond-Earth-demo.mp4').stat().st_size)
