const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const {spawn}=require('node:child_process');const fs=require('node:fs');
(async()=>{
 let server,browser;const publicUrl=process.env.REVIEW_URL;
 if(!publicUrl){server=spawn(process.execPath,['node_modules/vite/bin/vite.js','--host','127.0.0.1','--port','5193','--strictPort'],{stdio:['ignore','pipe','inherit']});await new Promise((r,j)=>{server.stdout.on('data',d=>d.toString().includes('Local:')&&r());server.on('exit',j)});}
 try{
  browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  console.log('Opening test page');await page.goto(publicUrl||'http://127.0.0.1:5193/',{waitUntil:'domcontentloaded',timeout:60000});console.log('Page ready');await page.getByRole('button',{name:/Leaving Earth NASA mission film/}).click();
  await page.getByRole('combobox',{name:'Choose film'}).waitFor();const ids=await page.locator('select[aria-label="Choose film"] option').evaluateAll(xs=>xs.map(x=>x.value));
  if(ids.length!==14)throw Error('Unexpected film count '+ids.length);for(const id of ids){
   await page.getByRole('combobox',{name:'Choose film'}).selectOption(id);
   await page.getByRole('button',{name:'Play film',exact:true}).first().waitFor({timeout:60000});
   await page.waitForFunction(()=>{const v=document.querySelector('.cinema video');return v?.readyState>=1&&v.src.startsWith('blob:')},{},{timeout:60000});
   await page.getByRole('button',{name:'Play film',exact:true}).first().click();await page.waitForFunction(()=>document.querySelector('.cinema video').currentTime>.1);
   await page.getByRole('button',{name:'Pause film',exact:true}).click();
   const duration=await page.locator('video').evaluate(v=>v.duration);const target=Math.min(duration*.65,duration-2);
   await page.getByRole('slider',{name:'Film progress'}).fill(String(Number(target.toFixed(1))));await page.waitForTimeout(180);
   let state=await page.locator('video').evaluate(v=>({t:v.currentTime,seekable:v.seekable.length?v.seekable.end(0):0,error:v.error?.message}));
   if(Math.abs(state.t-target)>.7||state.error||state.seekable<duration-1)throw Error(id+' seek failed '+JSON.stringify(state));
   await page.getByRole('button',{name:'Back ten seconds'}).click();await page.waitForTimeout(100);const back=await page.locator('video').evaluate(v=>v.currentTime);if(Math.abs(back-Math.max(0,target-10))>.7)throw Error(id+' back failed');
   await page.getByRole('button',{name:'Forward ten seconds'}).click();await page.waitForTimeout(100);const forward=await page.locator('video').evaluate(v=>v.currentTime);if(Math.abs(forward-Math.min(duration-.05,back+10))>.7)throw Error(id+' forward failed');
   console.log('PASS film load/play/seek/back/forward',id,Math.round(duration));
  }
  await page.getByRole('combobox',{name:'Choose film'}).selectOption('journey');await page.getByRole('button',{name:'Play film',exact:true}).first().waitFor();await page.getByRole('button',{name:'Play film',exact:true}).first().click();
  await page.getByRole('button',{name:'The journey home',exact:true}).click();await page.waitForTimeout(300);if(await page.locator('video').evaluate(v=>v.currentTime)<105)throw Error('Chapter did not seek');
  await page.getByRole('button',{name:'Pause film',exact:true}).click();const range=await page.getByRole('slider',{name:'Film progress'}).boundingBox();await page.mouse.move(range.x+range.width*.8,range.y+range.height/2);await page.mouse.down();await page.mouse.move(range.x+range.width*.4,range.y+range.height/2,{steps:12});await page.mouse.up();await page.waitForTimeout(200);const drag=await page.locator('video').evaluate(v=>v.currentTime);if(drag<45||drag>65)throw Error('Pointer drag failed '+drag);
  await page.screenshot({path:'previews/cinema-v2-desktop.png'});
  await page.getByRole('button',{name:'Close mission cinema'}).click();await page.getByRole('textbox',{name:'Search missions'}).fill('Skylab');await page.locator('.mission-card').click();if(await page.getByRole('tab',{name:'Watch',exact:true}).count())throw Error('Unrelated Skylab film');await page.getByText('Follow the hardware',{exact:true}).waitFor();await page.getByRole('tab',{name:'Explore',exact:true}).click();if(await page.getByRole('button',{name:'Watch this mission',exact:true}).count())throw Error('Fallback film still visible');await page.getByRole('button',{name:'Close mission details'}).click();await page.getByRole('button',{name:'Clear search'}).click();await page.getByRole('textbox',{name:'Search missions'}).fill('ISS');await page.locator('.mission-card').click();await page.getByRole('tab',{name:'Explore',exact:true}).click();await page.getByText('What shapes this orbit?',{exact:true}).waitFor();const params=await page.locator('.parameter-grid').innerText();if(/NaN/.test(params))throw Error('Invalid orbital parameters');await page.locator('.orbit-parameters').scrollIntoViewIfNeeded();await page.screenshot({path:'previews/orbit-parameters-v2.png'});await page.getByRole('button',{name:'Close mission details'}).click();
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>scrollTo(0,0));console.log('Page ready');await page.getByRole('button',{name:/Leaving Earth NASA mission film/}).click();await page.getByRole('button',{name:'Play film',exact:true}).first().waitFor();await page.getByRole('button',{name:'Play film',exact:true}).first().click();await page.getByRole('slider',{name:'Film progress'}).fill('70');await page.waitForTimeout(200);await page.screenshot({path:'previews/cinema-v2-mobile.png'});if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Mobile overflow');if(errors.length)throw Error(errors.join('\n'));console.log('PASS chapters, real pointer drag, mission mapping, hardware stories, orbital parameters, mobile, zero page errors.');
 }finally{await browser?.close();server?.kill()}
})().catch(e=>{console.error(e);process.exit(1)});
