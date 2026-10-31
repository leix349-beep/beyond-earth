"""Refresh only the two used AMSAT element sets. Never overwrite good data on failure."""
import urllib.request,json,pathlib,datetime,sys
url='https://www.amsat.org/tle/current/nasabare.txt'
p=pathlib.Path(__file__).resolve().parent.parent/'public/data/orbits.json'
try:
 text=urllib.request.urlopen(url,timeout=15).read().decode('utf-8')
 lines=[x.strip() for x in text.splitlines() if x.strip()];out={};now=datetime.datetime.now(datetime.timezone.utc).isoformat()
 for i,line in enumerate(lines):
  if line.startswith('1 ') and i+1<len(lines):
   ident=line[2:7].strip();key={'25544':'iss','48274':'tiangong'}.get(ident)
   if key:
    def checksum(s):return len(s)==69 and sum(int(x) if x.isdigit() else 1 if x=='-' else 0 for x in s[:68])%10==int(s[68])
    if not checksum(line) or not checksum(lines[i+1]):raise ValueError('TLE checksum failed')
    out[key]={'name':lines[i-1],'catalogId':int(ident),'line1':line,'line2':lines[i+1],'source':url,'retrievedAt':now}
 if len(out)!=2:raise ValueError('Required satellite not present')
 p.parent.mkdir(exist_ok=True);p.write_text(json.dumps(out,indent=2),encoding='utf-8');print('Saved verified AMSAT TLEs:',', '.join(out))
except Exception as e:print('Refresh failed; existing snapshot retained:',e,file=sys.stderr);sys.exit(1)
