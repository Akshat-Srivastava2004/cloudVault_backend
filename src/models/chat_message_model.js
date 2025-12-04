
import Workspace from "./workspace_model.js";
import Userprofile from "./userprofile_model.js";
import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

const Chatmessage=sequelize.define("Chatmessage",{
    id:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true,
    },
    senderid:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Userprofile,
            key:"id",
        },
    },
    workspaceid:{
       type:DataTypes.INTEGER,
       allowNull:false,
       references:{
        model:Workspace,
        key:"id",
       },
    },
    message:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
})

Chatmessage.belongsTo(Workspace, { foreignKey: "workspaceid" });
Workspace.hasMany(Chatmessage, { foreignKey: "workspaceid" });

export default Chatmessage;