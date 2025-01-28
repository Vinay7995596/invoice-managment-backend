import {moongoseModel, formModel} from '../models/allmodel.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import env from 'dotenv'

const generatetoken = (id) => {
    return jwt.sign({id}, process.env.secrete_jet_toke)
}

export const registerapi = async (req, res) => {
    try {
        const {name:nameValue, email:emailValue, password:passwordValue} = req.body
        const salt = await bcrypt.genSalt(10)
        const bcryptcode = await bcrypt.hash(passwordValue , salt)
        const dataStore = new moongoseModel({name:nameValue, email:emailValue , password:bcryptcode})
        await dataStore.save()
        return res.status(202).json({message:'succesfully register', dataStore})
        

    }catch (e) {
        console.log('error in storing to DB')
    }
}

export const loginapi = async(req, res) => {
    try {
        const {email, password} = req.body
        const formDetails = await moongoseModel.findOne({email})
        const ispaswword =  bcrypt.compare(password, formDetails.password)
        const token = generatetoken(fromdetails._id)
        const id = formDetails._id
        if (formDetails)  {
            if (ispaswword) {
                res.status(200).json({message:'getting details is ok', token, id})
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
}

export const fromdetails = async(req, res) => {
    try {
        const {invoicenumber, clientname,date, amount, amountStatus} = req.body
        const formData = new formModel({invoiceNumber:invoicenumber, clientName:clientname, date :date, amount:amount, amountStatus:amountStatus})
        await formData.save()
        return res.status(202).json({message:'form data', formData})
    }catch(e) {
        console.log(e, 'error in form submiting')
    }
}

export const gettingformdetails = async (req, res) => {
    try {
        const userToken = req.headers["authorization"]
        const response = await formModel.find()
        return res.status(202).json({message:'successfully fetching', response})
    }catch (e) {
        console.log(e, 'errror in fetching all details')
    }
}

export const updateDetails = async (req, res) => {
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
}