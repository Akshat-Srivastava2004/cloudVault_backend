import { sequelize } from "../database/db.js";
import Userprofile from "./userprofile_model.js";
import Workspace from "./workspace_model.js";
import { DataTypes } from "sequelize";

const Workspacemember = sequelize.define("Workspacemember", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  workspaceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Workspace,
      key: "id",
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Userprofile,
      key: "id",
    },
  },
  role: {
    type: DataTypes.ENUM("leader", "member"),
    defaultValue: "member",
  },
  joinedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, { 
  timestamps: true 
});


Workspacemember.belongsTo(Workspace, { foreignKey: "workspaceId" });
Workspace.hasMany(Workspacemember, { foreignKey: "workspaceId" });

Workspacemember.belongsTo(Userprofile, { foreignKey: "userId" });
Userprofile.hasMany(Workspacemember, { foreignKey: "userId" });

export default Workspacemember;
