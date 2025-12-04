import { Sequelize } from "sequelize";

export const sequelize=new Sequelize("cloudvault","root","akshat",{
  host:"localhost",
  dialect:"mysql"
})

export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection successful");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
}
