import { Router } from "express";


const router: Router = Router();

/**
 * Requests for an OTP to be sent to the user's email
 * 
 * Expects a JSON object with the following properties:
 *  - email: string
 * 
 */
router.post('/sign-in', (req, res) => { });

/**
 * Verifies the OTP sent to the user's email
 * 
 * Expects a JSON object with the following properties:
 *  - email: string
 *  - otp: string
 * 
 */
router.post('/verify-otp', (req, res) => { });

/**
 * Refresh the user's token
 * 
 * Expects a JSON object with the following properties:
 *  - token: string
 * 
 */
router.post('/refresh', (req, res) => { });

export default router;
