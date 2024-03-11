const {delay,loggerStep} = require('./utils');
const {siteInfo, loginCred} = require('./../config/config');

const login = async (page) => {
    loggerStep('logging in');
    await page.goto(siteInfo.LOGIN_URL);
  
    const form = await page.$("form#sign_in_form");
  
    const email = await form.$('input[name="user[email]"]');
    const password = await form.$('input[name="user[password]"]');
    const privacyTerms = await form.$('input[name="policy_confirmed"]');
    const signInButton = await form.$('input[name="commit"]');
    
    await email.type(loginCred.EMAIL);
    await password.type(loginCred.PASSWORD);
    await privacyTerms.click();
    await signInButton.click();
  
    await page.waitForNavigation();
    return true;
  }

module.exports = {
    login
 }
 