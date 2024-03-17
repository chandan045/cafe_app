const express=require("express");
const dotenv=require("dotenv").config();
const db=require("./config/dbConnectionConfig");
const bodyParser=require("body-parser");
const app=express();

const port=process.env.PORT;






//connect mongodb
db();



app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//middlewares
app.use(express.json());
app.use('/',require("./routes/route"));

app.set("view engine","ejs");

app.listen(port,()=>{
    console.log(`app is live on port ${port}`);
})