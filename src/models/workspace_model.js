import { sequelize } from "../database/db.js";
import Userprofile from "./userprofile_model.js";
import { DataTypes } from "sequelize";


const Workspace = sequelize.define("Workspace",{
   id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    primaryKey:true,
   },
   Name:{
    type:DataTypes.STRING,
    allowNull:false,
   },
   leaderId:{
    type:DataTypes.INTEGER,
    allowNull:false,
    references:{
        model:Userprofile,
        key:"id",
    },
   },
   passKey:{
    type:DataTypes.STRING,
    allowNull:false,
   },
   isActive:{
    type:DataTypes.BOOLEAN,
    defaultValue:true,
   },
},{timestamps:true})

export default Workspace;