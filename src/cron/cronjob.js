const cron = require('node-cron');
const puppeteer = require('puppeteer');
const logger =  require('./../config/logger');
const {scheduleProcess} = require('./../utils/appointment');
const {IS_PROD} = require('./../config/config');
const {parseISO, compareAsc, isBefore, format} = require('date-fns');

cron.schedule('0 * * * *', () => {
    const currentDate = format(new Date(), "yyyy-MM-dd H:m");
    console.log(`Running a job at every Hour ${currentDate}`);
    
    async () => {
        const browser = await puppeteer.launch(!IS_PROD ? {headless: false}: undefined);
        try{
          await scheduleProcess(browser);
        }catch(err){
          logger.error(err);
        }
        //await browser.close();
      };
 },{
  scheduled: true,
  timezone: "America/New_York"
});