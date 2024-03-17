
const mongoose = require('mongoose');
const dotenv=require("dotenv").config();

const uri=process.env.CONNECTION_STRING;
const dbConnection = async ()=>{
    try{
      const connect=  await mongoose.connect(uri);
      console.log("Database Connected",connect.connection.host,connect.connection.name);
    }
    catch{
       console.log("Failed to connect with database");
       process.exit(1);
    }
}

module.exports=dbConnection;
