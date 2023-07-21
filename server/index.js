const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const router = require("./routes");
const connectDB = require("./db/db");
// const formidable = require("express-formidable");

const app = express();
app.use(express.json());
app.use(cors());
// app.use(formidable());
app.use('/api',router);

connectDB();

const port = process.env.PORT;
app.listen(port , ()=>{
    console.log(`Server listening on PORT : ${port}`);
})