import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import env from 'dotenv'
const app = express()

const port = 5500;


import routingApi from './routers/routing.js';


app.use(express.json())
app.use(cors())
env.config()

const url = process.env.deployUrl

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true,})
.then(() => {
    console.log('success to connect DB')
})
.catch((e) => {
    console.log(e, 'error in connection DB')
})





app.use('/api/users', routingApi)

app.listen(port, ()=> {
    console.log('server riunning on 5500')
})