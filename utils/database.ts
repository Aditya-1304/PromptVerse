import mongoose from "mongoose";

let isConnected : boolean = false;  

export const connectToDB = async ()=> {
  mongoose.set('strictQuery', true) 
  if(isConnected) {
    console.log("mongodb is connected");
    return;
  }
  try {

  }catch (e) {
    
  }
}