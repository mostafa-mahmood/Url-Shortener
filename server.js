require('dotenv').config();
const express = require('express');
const app = express();


(async function connectDb(){
          try{
                    await mongoose.connect(process.env.MONGO_URI);
                    console.log("Connected to DB");
          } catch(err){
                    console.error(`Error Connecting to DB: ${err}`);
          }
})();







const PORT = process.env.PORT || 3000;
const DOMAIN = process.env.DOMAIN || 'localhost';
app.listen(PORT, DOMAIN, () => {
          console.log(`Server Running on: http://${DOMAIN}:${PORT}`);
})