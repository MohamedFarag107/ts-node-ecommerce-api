import mongoose from "mongoose";

export default async function connectToDB() {
   try {
    await mongoose.connect('mongodb://localhost:27017/ecommerce-ts');
    console.log('db connected');
    
   } catch (error) {
    console.log('failed to connect to database');
   }
}