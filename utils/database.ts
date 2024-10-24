import mongoose from "mongoose";

let isConnected : boolean = false;  

export const connectToDB = async ()=> {
  mongoose.set('strictQuery', true) 
  if(isConnected) {
    console.log("mongodb is connected");
    return;
  }
  try {
    mongoose.connect(process.env.MONGODB_URI || "" , {
      dbName : "share_prompt"
    })
    isConnected = true;
  }catch (e) {
    console.log(e)
  }
}