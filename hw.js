const puppeteer = require('puppeteer');


  (async () => {console.log('launched');
    const browser = await puppeteer.launch({})
    const page = await browser.newPage()
    await page.setViewport({ width: 800, height: 400 })
    await page.goto('https://el1.netanya.ac.il')
    await page.$eval('input[name=username]', el => el.value = 'USERNAME')
    await page.$eval('input[name=password]', el => el.value = 'password')
    await page.click('#loginbtn')
    await page.goto('https://el1.netanya.ac.il/mod/assign/view.php?id=218908')
    await page.screenshot({ path: 'time.png', fullPage: false })
    await browser.close()
    console.log('Called!');
  })()

setInterval(function () {
  console.log('Every 5 Min');
  (async () => {
    const browser = await puppeteer.launch({})
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 300 })
    await page.goto('https://el1.netanya.ac.il')
    await page.$eval('input[name=username]', el => el.value = 'username')
    await page.$eval('input[name=password]', el => el.value = 'password')
    await page.click('#loginbtn')
    await page.goto('https://el1.netanya.ac.il/mod/assign/view.php?id=218908')
    await page.screenshot({ path: 'time.png', fullPage: true })
    await browser.close()
  })()
},1 * 60 * 60 * 1000); // 1 hour
