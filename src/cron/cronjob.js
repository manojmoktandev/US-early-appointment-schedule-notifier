const cron = require('node-cron');
const puppeteer = require('puppeteer');
const logger =  require('./../config/logger');
const {scheduleProcess} = require('./../utils/appointment');
const {IS_PROD} = require('./../config/config');

cron.schedule('*/15 * * * *', () => {
    console.log('Running a job at every 15 minutes');
    
    async () => {
        const browser = await puppeteer.launch(!IS_PROD ? {headless: false}: undefined);
        try{
          await scheduleProcess(browser);
        }catch(err){
          logger.error(err);
        }
        //await browser.close();
      };
 });

