import { ApiError } from "../utils/ApiError.js";
import argon2 from "argon2";

console.log("Password ki gali me enter karte hue ");
async function  Passwordbcrpypt(Password) {
   try {
     if(!Password){
        throw new ApiError(400,"Password is missing ");
     }
        const hashingpassword=await argon2.hash(Password);
        console.log("Password hashing completed ");
        return hashingpassword;
   } catch (error) {
      console.log("here is the error",error);
      throw new ApiError(500,"Hashing_failed");
   }
}
console.log("password ki gali se nikalte hue ");

async function Passwordcomparing(password,hashed) {
   try {
     if(!password || !hashed){
      throw new ApiError(400,"password is missing ");
     }
 
     const isMatch=await argon2.verify(hashed,password);
 
     if(!isMatch){
         throw new ApiError(500,"Password Mismatched")
     }
     return true;
   } catch (error) {
    console.log("The error recieved in this block is :",error);
    throw new ApiError(500,"Failed to verify the password")
   }
    
}
export {Passwordbcrpypt,Passwordcomparing};