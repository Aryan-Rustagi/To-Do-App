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

// Serve static assets from client dist
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Catch-all route to serve index.html for SPA router
app.get("*", function(req, res, next) {
    if (req.path.startsWith('/api')) {
        return next();
    }
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(PORT,function(){
    console.log(`Server is running on port ${PORT}`);
});
