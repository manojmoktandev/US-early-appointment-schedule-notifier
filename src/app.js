const express = require('express');
const app = express();
const fs =  require('fs');
const path =  require('path');
const puppeteer = require('puppeteer');
const logger =  require('./config/logger');
const {scheduleProcess} = require('./utils/appointment');
const {IS_PROD,PORT} = require('./config/config');
const routes = require('./routes');

app.use('/', routes);
app.set('view engine', 'ejs');

// Path to the JSON file
const dataFilePath = path.join(__dirname, 'logs/data.json');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

(async () => {
  const browser = await puppeteer.launch(!IS_PROD ? {headless: false}: undefined);
  try{
    await scheduleProcess(browser);
  }catch(err){
    logger.error(err);
  }
  //await browser.close();
})();



server = app.listen(PORT, () => {
  console.info(`Listening to port ${PORT}`);
});


