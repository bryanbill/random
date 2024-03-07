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
router.post('/sign-in', async (req, res) => {
    try {
        await auth.signIn(req.body.email);

        return res.status(200).json({
            status: 0,
            message: 'OTP sent to email',
        });
    } catch (err) {
        console.log(err);
        
        return res.status(500).json({
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
router.post('/verify-otp', async (req, res) => {
    try {
        const response = await auth.verifyOtp(req.body.email, req.body.otp);
        if (!response) {
            return res.status(401).json({
                status: 1,
                message: 'Invalid OTP',
            });
        }

        return res.status(200).json({
            status: 0,
            message: 'OTP verified',
            data: {
                token: response
            },
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 1,
            message: 'Internal server error',
        });
    }
});


export default router;
