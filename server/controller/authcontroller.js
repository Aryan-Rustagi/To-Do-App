const User=require('../models/User');

const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');

function generateToken(id){
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'15d'
    });
}

async function register(req,res){
     try{
        const{email,password}=req.body;

        const userExists=await User.findOne({email});
        if(userExists){
         return(
            res.status(400).json({message:'User already exists'})
         );
        }
          
        const user= await User.create({email,password});

        res.status(201).json({
            _id:user._id,
            email:user.email,
            token:generateToken(user._id),
        });
     }
     catch(error){
        res.status(500).json({message:error.message});
     }
}

async function login(req,res){
     try{
        const {email,password}=req.body;
        const user=await User.findOne({email});

        if(user && await bcrypt.compare(password, user.password)){
            res.status(200).json({
                _id:user._id,
                email:user.email,
                token:generateToken(user._id),
            });
        }else{
            res.status(401).json({message:'Invalid credentials'});
        }
     }
     catch(error){
        res.status(500).json({message:error.message});
     }
}

module.exports={register,login};