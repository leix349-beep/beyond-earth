import assert from 'node:assert/strict';
import fs from 'node:fs';
import {buildOrbit,validRecord} from '../src/orbit.ts';
const records=JSON.parse(fs.readFileSync('public/data/orbits.json','utf8'));
for(const [id,r] of Object.entries(records)){
 assert(validRecord(r));
 const epoch=buildOrbit(r,new Date('2050-01-01')).epoch;
 const track=buildOrbit(r,new Date(epoch));
 assert.equal(track.historical,false);assert.equal(track.points.length,361);
 assert(track.periodMinutes>85&&track.periodMinutes<100);
 assert(track.points.every(p=>p.altitude>300&&p.altitude<500&&p.speed>7&&p.speed<8.5));
 const inclination=Number(r.line2.slice(8,16));assert(track.points.every(p=>Math.abs(p.latitude)<inclination+1));
 assert.equal(buildOrbit(r,new Date('2050-01-01')).historical,true);
 assert.equal(buildOrbit(r,new Date('2050-01-01')).start,epoch);
 assert.throws(()=>buildOrbit({...r,line1:r.line1.slice(0,68)+(r.line1[68]==='0'?'1':'0')}));
 console.log(id, 'PASS', 'epoch',epoch,'period',track.periodMinutes.toFixed(2),'min');
}
