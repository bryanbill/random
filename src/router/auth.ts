import { Router } from "express";
import { auth } from "../controller";

const router: Router = Router();

/**
 * Requests for an OTP to be sent to the user's email
 * 
 * Expects a JSON object with the following properties:
 *  - email: string
 * 
 */
router.post('/sign-in', (req, res) => {
    try {
        const response = auth.signIn(req.body.email);
        res.status(200).json({
            status: 0,
            message: 'OTP sent to email',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 1,
            message: 'Internal server error',
        });
    }
});

/**
 * Verifies the OTP sent to the user's email
 * 
 * Expects a JSON object with the following properties:
 *  - email: string
 *  - otp: string
 * 
 */
router.post('/verify-otp', (req, res) => {
    try {
        const response = auth.verifyOtp(req.body.email, req.body.otp);
        res.status(200).json({
            status: 0,
            message: 'OTP verified',
            data: {
                token: response
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 1,
            message: 'Internal server error',
        });
    }
});


export default router;
