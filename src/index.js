
import { sequelize,connectDB } from "./database/db.js";
import filepermission from "./models/file_permisson_model.js";
import Userprofile from "./models/userprofile_model.js";
import FilesUser from "./models/userfiles_model.js";
import Workspace from "./models/workspace_model.js";
import Workspacemember from "./models/Work_space_member.js";
import Chatmessage from "./models/chat_message_model.js";
import dotenv from "dotenv";
dotenv.config({
    path: './public/.env'
});
async function main() {
  try {
    await connectDB();
    await sequelize.sync(); 
    console.log("✅ All tables synced successfully!");
  } catch (error) {
    console.error("❌ Error syncing tables:", error);
  }
}

main();

main();
