import mongoose from "mongoose";

 const schema = new mongoose.Schema({
    name : String,
    email : String,
    password : String
});

 const formDataScema = new mongoose.Schema({
    invoiceNumber:Number,
    clientName : String,
    date: String,
    amount : Number,
    amountStatus: String
})

 export const formModel = mongoose.model('formdeatils', formDataScema)
 export const moongoseModel = mongoose.model('loginUsers', schema)
