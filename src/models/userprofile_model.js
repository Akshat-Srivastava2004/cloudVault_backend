import { sequelize } from "../database/db.js";
import { DataTypes } from "sequelize";
import jwt from "jsonwebtoken";
const Userprofile=sequelize.define("Userprofile",{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
    },
    fullName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    Email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
        validate:{
            isEmail:true,
        },
    },
    RefreshToken:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    Password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
},{timestamps:true});


Userprofile.prototype.generateAccessToken=function(){
    return jwt.sign(
        {
            id:this.id,
            fullName:this.fullName,
            Email:this.Email,
        },
        process.env.ACCESS_TOKEN_SECRET,
       { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d" }
    );
};

Userprofile.prototype.generateRefreshToken=function(){
    return jwt.sign(
        {id:this.id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_SECRET||"7d"}
    );
};
export default Userprofile