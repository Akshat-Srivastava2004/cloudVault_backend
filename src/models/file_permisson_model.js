import FilesUser from "./userfiles_model.js";
import Userprofile from "./userprofile_model.js";
import { sequelize } from "../database/db.js";
import { DataTypes } from "sequelize";
const filepermission=sequelize.define("filepermission",{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
    },
    fileid:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:FilesUser,
            key:"id",
        },
    },
    userid:{
    type:DataTypes.INTEGER,
    allowNull:false,
    references:{
        model:Userprofile,
        key:"id",
    },
   },
},
   {
    timestamps:true

   });


Userprofile.belongsToMany(FilesUser,{through:filepermission,foreignKey:"userid"})
FilesUser.belongsToMany(Userprofile,{through:filepermission,foreignKey:"fileid"})

export default filepermission