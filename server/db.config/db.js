const mongoose=require('mongoose');

async function dbconnect(){
    if (!process.env.MONGO_URI) {
        console.error("FATAL ERROR: MONGO_URI environment variable is missing!");
        console.error("Please set MONGO_URI in your host (Render/Railway) Environment Variables settings.");
        process.exit(1);
    }
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to database");
    }
    catch(error){
        console.error("Database connection error: " + error.message);
        process.exit(1);
    }
}

module.exports=dbconnect;