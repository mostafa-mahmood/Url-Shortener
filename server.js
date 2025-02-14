require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const shortenRouter = require('./shorten');
const redirectRouter = require('./redirect');

async function connectDb(){
          try{
                    await mongoose.connect(process.env.MONGO_URI);
                    console.log("Connected to DB");
          } catch(err){
                    console.error(`Error Connecting to DB: ${err}`);
                    process.exit(1);
          }
};

connectDb();

app.use(cors());

app.use(express.json());

app.use('/', shortenRouter);

app.use('/', redirectRouter);


const PORT = process.env.PORT || 3000;
const DOMAIN = process.env.DOMAIN || 'localhost';
app.listen(PORT, DOMAIN, () => {
          console.log(`Server Running on: http://${DOMAIN}:${PORT}`);
})