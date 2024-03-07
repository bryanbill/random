import { user, queue } from '../service';
import { redisClient } from '../config';
import { encodeJwt } from '../middleware';

const signIn = async (email: string) => {

    const response = await user.getUserByEmail(email);
    if (!response) {
        await user.createUser({
            email
        });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    redisClient.set(email, otp, {
        EX: 60 * 5
    });

    queue.addToQueue({
        to: email,
        subject: 'OTP for login',
        text: `Your OTP is ${otp}`
    });

    return;
}

const verifyOtp = async (email: string, otp: string) => {
    const savedOtp = await redisClient.get(email);
    redisClient.del(email);

    if (savedOtp && (parseInt(savedOtp!) === parseInt(otp))) {
        const res = await user.getUserByEmail(email);

        const jwt = await encodeJwt({
            id: res.id,
            email: res.email
        });

        return {
            token: jwt,
            ...res
        };
    }

    return null;
}


export {
    signIn,
    verifyOtp,
}