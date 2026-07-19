const express= require("express");
const cors= require("cors");
const path = require("path");
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const app = express();
const dbconnect=require("./db.config/db");
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");

dbconnect();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "../client/dist")));

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Catch-all route to serve index.html for React Router SPA routes
app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"), function(err) {
        if (err) {
            res.status(404).send("SPA fallback: index.html not found. Please ensure the frontend client is built using 'npm run build'.");
        }
    });
});

app.listen(PORT,function(){
    console.log(`Server is running on port ${PORT}`);
});
