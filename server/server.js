const express= require("express");
const cors= require("cors");
require('dotenv').config();
const PORT=5000;
const app = express();
const dbconnect=require("./db.config/db");
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");

dbconnect();



app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

app.get('/',function(req,res){
    res.json({message:"Welcome to the server"});
});

app.listen(PORT,function(){
    console.log(`Server is running on port ${PORT}`);
});
