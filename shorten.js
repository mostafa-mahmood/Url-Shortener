require('dotenv').config();
const express = require('express');
const router = express.Router();
const crypto = require('node:crypto');
const UrlCollection = require('./schema');

router.post('/shorten', async (req, res) => {
          const {originalUrl} = req.body;

          const validationState = validateURL(originalUrl);
          if(!validationState){
                    res.status(400).json({'error':'invalid Url'});
                    return;
          }

          try {                    
                    const urlHash = generateHash(originalUrl);
                    
                    let existingUrl = await UrlCollection.findOne({ urlHash });  
              
                    if (existingUrl) {  
                        res.status(200).json({
                              "shortUrl": `http://${process.env.DOMAIN}:${process.env.PORT}/${existingUrl.urlHash}`
                        }); 
                        return;
                    } 

                    const insertionState = await insertIntoDb(originalUrl, urlHash);
                    if(!insertionState){
                        res.status(500).json({'error':'error inserting into DB'});
                        return;
                    }
            
                    res.status(200).json({
                              "shortUrl": `http://${process.env.DOMAIN}:${process.env.PORT}/${urlHash}`
                    });
          } catch(err) {
                    res.status(500).json({'error': 'Database error'});
          }
});

function validateURL(url) {
          try {
              new URL(url);
              return true;
          } catch (err) {
              return false;
          }
}

function generateHash(url) {  
          const hash = crypto.createHash('sha256')  
              .update(url)  
              .digest('hex')
              .slice(0, 6);
          
          return hash;  
}

async function insertIntoDb(originalUrl, urlHash) {  
          try {  
              await UrlCollection.create({originalUrl,urlHash});
              return true;  
          } catch(err) {              
              console.error(`Error in insertIntoDb function: ${err}`);  
              return false;  
          }  
}

module.exports = router;

