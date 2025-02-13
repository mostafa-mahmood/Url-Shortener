const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({  
          originalUrl: {   
              type: String,   
              required: true,   
              unique: true 
          },  
          urlHash: {   
              type: String,   
              required: true,   
              unique: true   
          },  
          createdAt: {   
              type: Date,   
              default: Date.now   
          }  
      });

const UrlCollection = mongoose.model('Url',urlSchema);

module.exports = UrlCollection;
