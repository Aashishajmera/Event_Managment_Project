import express from 'express';
import dotenv from 'dotenv';
import { checkUserRegistration, getUserList, RegistrationForEvent } from '../controller/UserEventDetails.Controller.js';
import { check } from 'express-validator';


// for env file
dotenv.config();


export const userEventDetailsRouter = express.Router();

// VALIDATION FOR REGISTRATION
const registrationValidation = [
    check('username').notEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Valid email is required'),
    check('contactNumber').notEmpty().withMessage('Contact number is required'),
    check('address').notEmpty().withMessage('Address is required'),
    check('eventId').isMongoId().withMessage('Valid Event ID is required'),
    check('userId').isMongoId().withMessage('Valid Event ID is required')
];

// FOR USER REGISTRATION
userEventDetailsRouter.post(process.env.USER_REGISTRATION, registrationValidation, RegistrationForEvent);

// FOR CHECK THE USER REGISTRATION
userEventDetailsRouter.post(process.env.CHECK_REGISTRATION, checkUserRegistration);

// FOR FIND THE USER LIST
userEventDetailsRouter.post(process.env.FIND_USER_LIST, getUserList)