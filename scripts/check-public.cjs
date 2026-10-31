const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const response=await page.goto('https://beyond-earth-spacetime.genialconch.chatgpt.site',{waitUntil:'domcontentloaded',timeout:60000});
  if(response.status()!==200)throw Error('Public page HTTP '+response.status());
  await page.getByText('Rockets, radio signals, rooms in orbit.',{exact:false}).waitFor();
  await page.evaluate(()=>document.fonts.ready);
  const fonts=await page.evaluate(()=>({display:document.fonts.check('48px Newsreader'),body:document.fonts.check('16px "DM Sans"'),mono:document.fonts.check('12px "Plex Mono"')}));
  if(Object.values(fonts).some(v=>!v))throw Error('Missing local font '+JSON.stringify(fonts));
  await page.getByRole('button',{name:/Leaving Earth NASA mission film/}).click();
  await page.getByRole('button',{name:/Play with mission audio/}).click();
  await page.waitForFunction(()=>document.querySelector('.cinema video')?.currentTime>0,{},{timeout:30000});
  await page.getByRole('button',{name:'Close mission cinema'}).click();
  await page.getByRole('textbox',{name:'Search missions'}).fill('Apollo 11');
  await page.locator('.mission-card').click();
  await page.getByText('Three people went to the Moon.',{exact:false}).waitFor();
  await page.getByRole('button',{name:'Show answer',exact:true}).click();
  await page.locator('.mission-reading').scrollIntoViewIfNeeded();
  await page.screenshot({path:'previews/public-polish-dossier.png'});
  await page.getByRole('button',{name:'Close mission details'}).click();
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(600);
  await page.screenshot({path:'previews/public-polish-mobile.png'});
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Mobile overflow');
  if(errors.length)throw Error(errors.join('\n'));
  console.log('PASS public HTTP 200, revised copy, 3 local fonts, film playback, story/answer, mobile, zero page errors.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
