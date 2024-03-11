const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, './../../.env'), override:true });
const {addYears, format} = require('date-fns');

const addedDate = addYears(new Date(), 1);
const notifyDateBefore = format(addedDate, "yyyy-MM-dd");
module.exports = {
    loginCred:{
      EMAIL: process.env.EMAIL,
      PASSWORD: process.env.PASSWORD,
      APPLICANT_NAME:'Applicant'
    },
  
    siteInfo: {
      COUNTRY_CODE: process.env.COUNTRY_CODE || 'en-ca',
      SCHEDULE_ID: process.env.SCHEDULE_ID,
      FACILITY_ID: process.env.FACILITY_ID,
      FACILITY_IDS: {
        89:'Calgary',
        90:'Halifax',
        91:'Montreal',
        92:'Ottawa',
        93:'Quebec City',
        94:'Toronto',
        95:'Vancouver'
    },

      get APPOINTMENTS_JSON_URL(){
        return `https://ais.usvisa-info.com/${this.COUNTRY_CODE}/niv/schedule/${this.SCHEDULE_ID}/appointment/days/${this.FACILITY_ID}.json?appointments%5Bexpedite%5D=false`
      },
  
      get LOGIN_URL () {
        return `https://ais.usvisa-info.com/${this.COUNTRY_CODE}/niv/users/sign_in`
      }
    },
    IS_PROD: process.env.NODE_ENV === 'prod',
    ENV:process.env.NODE_ENV,
    NEXT_SCHEDULE_POLL: process.env.NEXT_SCHEDULE_POLL || 10000, // default to 10 seconds
    MAX_NUMBER_OF_POLL: process.env.MAX_NUMBER_OF_POLL || 250, // number of polls before stopping
    NOTIFY_ON_DATE_BEFORE: process.env.NOTIFY_ON_DATE_BEFORE || notifyDateBefore, // in ISO form-at i.e YYYY-MM-DD
    SITE_ADMIN_NAME : 'MANOJ MOKTAN',
  
    NOTIFY_EMAILS: process.env.NOTIFY_EMAILS, // comma separated list of emails
    mailSmtp:{
      SMTP_HOST:process.env.SMTP_HOST,
      SMTP_PORT:process.env.SMTP_HOST,
      SMTP_USERNAME:process.env.SMTP_HOST,
      SMTP_PASSWORD:process.env.SMTP_PASSWORD,
      EMAIL_FROM:process.env.EMAIL_FROM
    }
  }
  