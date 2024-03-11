const logger = require('./../config/logger');
const config = require('./../config/config');

const debug = async (page, logName, saveScreenShot) => {
  if(saveScreenShot){
    await page.screenshot({path: `${logName}.png`});
  }
  await page.evaluate(() => {
  });
};

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

const loggerStep = (stepTitle) => {
  //logger.info(`=====>>> Step: ${stepTitle}`);
  config.ENV === 'development' ? console.log(`=====>>> Step: ${stepTitle}`) : '';
}

module.exports = {
   debug,
   delay,
   loggerStep
}
