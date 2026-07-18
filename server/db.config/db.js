const mongoose=require('mongoose');

async function dbconnect(){
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
            console.log("Connected to database");
            
    }
    catch(error){
        console.log("Errors"+error.message);
           process.exit(1);
    }
}

module.exports=dbconnect;