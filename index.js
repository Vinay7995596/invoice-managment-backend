const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const port = 5500;


const deployUrl = 'mongodb+srv://ragichattuvinay7995:sIptkomxoE6hoZJn@cluster0.fzael.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'


app.use(express.json())
app.use(cors())

mongoose.connect(deployUrl, { useNewUrlParser: true, useUnifiedTopology: true,})
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



const moongoseModel = mongoose.model('loginUsers', schema)


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

app.post('/signin', async (req, res) => {
    try {
        const {email, password} = req.body
        const formDetails = await moongoseModel.findOne({email})
        if (formDetails)  {
            if (formDetails.password === password) {
                res.status(200).json({message:'getting details is ok'})
            }
            else {
                res.status(400).json({message:'password is not matching'})
            }
            
        }
        else {
            res.status(404).json({message:'email is found it'})
        }
    }catch (e) {
        console.log(e)
    }
})

app.put('/updatedata', async (req, res) => {
    try {
        const {updateStatus, id} = req.body
        const updatingDetails = await formModel.findOneAndUpdate({_id: id}, {amountStatus : updateStatus}, {new:true})
        if (updatingDetails) {
            res.status(200).json({message:'id is found'})
            console.log(id)
        }
    }catch(e) {
        console.log(e, 'stored value is problem')
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