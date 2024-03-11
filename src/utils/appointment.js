const logger =  require('./../config/logger');
const {delay,loggerStep} = require('./utils');
const {login} = require('./auth');
const {parseISO, compareAsc, isBefore, format} = require('date-fns');
const {emailNotifierBody} =  require('./../template/notifier');

const {siteInfo, loginCred,SITE_ADMIN_NAME, NEXT_SCHEDULE_POLL, MAX_NUMBER_OF_POLL, NOTIFY_ON_DATE_BEFORE} = require('./../config/config');
const {sendEmail} = require('./email');

let isLoggedIn = false;
let maxTries = MAX_NUMBER_OF_POLL;


const getScheduleAppointmentUrl = (siteInfo,facility_id)=>{
    const {COUNTRY_CODE,SCHEDULE_ID} =  siteInfo;
    return `https://ais.usvisa-info.com/${COUNTRY_CODE}/niv/schedule/${SCHEDULE_ID}/appointment/days/${facility_id}.json?appointments%5Bexpedite%5D=false`;
}

const checkForSchedules = async (page,scheduleAppointmentUrl,facility_name) => {
    loggerStep(`checking for schedules ${facility_name}`);
    await page.setExtraHTTPHeaders({
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'X-Requested-With': 'XMLHttpRequest'
    });
    await page.goto(scheduleAppointmentUrl);
  
    const originalPageContent = await page.content();
    const bodyText = await page.evaluate(() => {
      //console.log('innerText : ',document.querySelector('body').innerText);
      return document.querySelector('body').innerText
    });
  
    try{
      const parsedBody =  JSON.parse(bodyText);
      if(parsedBody.length>0){
        loggerStep(`Here is the date available  at facility ${facility_name}`,bodyText);
        loggerStep(`Parse Body : `,bodyText);
      }
  
      if(!Array.isArray(parsedBody)) {
        logger.error("Failed to parse dates, probably because you are not logged in");
        throw "Failed to parse dates, probably because you are not logged in";
      }
  
      const dates =parsedBody.map(item => parseISO(item.date));
      const datesArr =parsedBody.map(item => item.date);
      const [earliest] = dates.sort(compareAsc);
      const earliestDateArr = datesArr.sort(compareAsc);
      if(earliestDateArr.length>0){
        loggerStep(`earliest date:${earliestDateArr.join(',')}`);
      }
      return earliest;
    }catch(err){
      logger.error("Unable to parse page JSON content", originalPageContent);
      logger.error(err);
      isLoggedIn = false;
    }
  }

const scheduleProcess = async (browser) => {
    loggerStep(`starting process with ${maxTries} tries left`);
    if(maxTries-- <= 0){
      loggerStep('Reached Max tries');
      return
    }
    const page = await browser.newPage();
    if(!isLoggedIn) {
       isLoggedIn = await login(page);
    }
  
    for (let facility_id in siteInfo.FACILITY_IDS) {
      const facility_name = siteInfo.FACILITY_IDS[facility_id];
      const scheduleAppointmentUrl = getScheduleAppointmentUrl(siteInfo,facility_id);
      
      const earliestDate = await checkForSchedules(page,scheduleAppointmentUrl,facility_name);
      if(earliestDate && isBefore(earliestDate, parseISO(NOTIFY_ON_DATE_BEFORE))){
        logger.info(`There is earliest date Found in Facility at  ${siteInfo.FACILITY_IDS[facility_id]}: ${earliestDate}`);
        await notifyMe(earliestDate);
      }
      await delay(NEXT_SCHEDULE_POLL)
      await scheduleProcess(browser)
    }
}

const notifyMe = async (earliestDate) => {
    const formattedDate = format(earliestDate, 'dd-MM-yyyy');
    const appicantName = loginCred.APPLICANT_NAME;
    const siteAdminName = SITE_ADMIN_NAME;
    loggerStep(`sending an email to schedule for ${formattedDate}`);
    await sendEmail({
      subject: `US Interview Appointment, We found an earlier date ${formattedDate}`,
      html: emailNotifierBody(appicantName,formattedDate,siteAdminName)
    })
}
module.exports = {
    scheduleProcess
}