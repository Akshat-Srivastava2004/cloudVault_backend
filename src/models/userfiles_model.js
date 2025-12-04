
import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import Userprofile from "./userprofile_model.js";
import Workspace from "./workspace_model.js";
const FilesUser = sequelize.define("FilesUser",{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true
    },
    Filename:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    Filelocation:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    Filetype:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    Filesize:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    Ownerid:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Userprofile,
            key:"id",
        },
    },
    encryptedkey:{
       type:DataTypes.STRING,
       allowNull:false,

    },
    iv:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    authTag:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    checksum:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    version:{
        type:DataTypes.INTEGER,
        defaultValue:1,
    },
    workspaceid:{
       type:DataTypes.INTEGER,
       allowNull:true,
       references:{
        model:Workspace,
        key:"id",
       },
    },
},{timestamps:true});
Userprofile.hasMany(FilesUser,{foreignKey:"Ownerid"});
FilesUser.belongsTo(Userprofile,{foreignKey:"Ownerid"});
FilesUser.belongsTo(Workspace, { foreignKey: "workspaceid" });
Workspace.hasMany(FilesUser, { foreignKey: "workspaceid" });
export default FilesUser