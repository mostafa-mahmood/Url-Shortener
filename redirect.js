const express = require('express');
const router = express.Router();
const UrlCollection = require('./schema');


router.get('/:hash', async (req, res) => {
          try{
                    const {hash} = req.params;
          
                    const urlDoc = await UrlCollection.findOne({urlHash:hash});
          
                    if(!urlDoc){
                              res.status(404).json({'error':'Url Not Found'});
                    }
          
                    res.redirect(urlDoc.originalUrl);
          } catch(err){
                    res.status(500).json({'error':'Database Error'});
          }
});

module.exports = router;