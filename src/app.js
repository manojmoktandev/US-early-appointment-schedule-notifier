const puppeteer = require('puppeteer');
const logger =  require('./config/logger');
const {scheduleProcess} = require('./utils/appointment');
const {IS_PROD} = require('./config/config');

(async () => {
  const browser = await puppeteer.launch(!IS_PROD ? {headless: false}: undefined);
  try{
    await scheduleProcess(browser);
  }catch(err){
    logger.error(err);
  }
  //await browser.close();
})();


