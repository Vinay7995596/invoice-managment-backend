import express, { Router } from 'express'
import { registerapi, loginapi, fromdetails, gettingformdetails, updateDetails } from '../controllers/testing.js'


const routingapi = Router()

routingapi.post('/signup', registerapi)

routingapi.post('/signin', loginapi)

routingapi.post('/formSubmit', fromdetails)

routingapi.get('/fetching-details', gettingformdetails)

routingapi.put('/updatedata', updateDetails)

export default routingapi
