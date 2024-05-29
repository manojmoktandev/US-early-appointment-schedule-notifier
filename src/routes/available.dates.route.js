const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fs =  require('fs');
const path = require('path');
const logger =  require('../config/logger');
const router = express.Router();

router.get('/', (req, res) => {
  const filter = req.query.filter || '';
    const content = readFileSync();
    content.then((data)=>{      
      const jsonData = data?JSON.parse(data):[];
      const filteredData = !filter?jsonData:jsonData.filter(item =>
        item.date.toLowerCase().includes(filter.toLowerCase()) || item.name.toLowerCase().includes(filter.toLowerCase())
      );
      res.render('available_dates',{data:filteredData,filter});
        
    });
    
});

async function readFileSync() {
    try {
      return fs.readFileSync('./src/logs/data.json', 'utf8');
    } catch (err) {
      if (err.code === 'ENOENT') {
        logger.error(`File not found: ${err.path}`);
      } else {
        logger.error(err);
      }
    }
  }
  
module.exports = router;

