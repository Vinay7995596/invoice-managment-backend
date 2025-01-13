const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const port = 5500;

const url = 'mongodb://localhost:27017/test'

app.use(express.json())
app.use(cors())

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true,})
.then(() => {
    console.log('success to connect DB')
})
.catch((e) => {
    console.log(e, 'error in connection DB')
})

const schema = new mongoose.Schema({
    name : String,
    email : String,
    password : String
});



const moongoseModel = mongoose.model('logindetails', schema)


app.post('/signup', async (req, res) => {
    
    try {
        const {name:nameValue, email:emailValue, password:passwordValue} = req.body
        const dataStore = new moongoseModel({name:nameValue, email:emailValue , password:passwordValue})
        await dataStore.save()
        return res.status(202).json({message:'succesfully register', dataStore})

    }catch (e) {
        console.log('error in storing to DB')
    }
})

const formDataScema = new mongoose.Schema({
    invoiceNumber:Number,
    clientName : String,
    date: String,
    amount : Number,
    amountStatus: String
})

const formModel = mongoose.model('formdeatils', formDataScema)

app.post('/formSubmit', async (req, res) => {
    try {
        const {invoicenumber, clientname,date, amount, amountStatus} = req.body
        const formData = new formModel({invoiceNumber:invoicenumber, clientName:clientname, date :date, amount:amount, amountStatus:amountStatus})
        await formData.save()
        console.log(formData)
        return res.status(202).json({message:'form data', formData})
    }catch(e) {
        console.log(e, 'error in form submiting')
    }
})

app.get('/fetching-details', async (req, res) => {
    try {
        const response = await formModel.find()
        return res.status(202).json({message:'successfully fetching', response})
    }catch (e) {
        console.log(e, 'errror in fetching all details')
    }
})

app.listen(port, ()=> {
    console.log('server riunning on 5500')
})