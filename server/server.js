const express= require("express");
const cors= require("cors");
const PORT=5000;
const app = express();


app.use(express.json());
app.use(cors);

app.get('/',function(req,res){
    res.json({message:"Welcome to the server"});
});

app.listen(PORT,function(){
    console.log(`Server is running on port ${PORT}`);
});
