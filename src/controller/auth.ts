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

const verifyOtp = async (email: string, otp: number) => {
    const savedOtp = await redisClient.get(email);

    if (savedOtp && (parseInt(savedOtp!) === otp)) {
        redisClient.del(email);

        const res = await user.getUserByEmail(email);

        const jwt = await encodeJwt({
            id: res.id,
            email: res.email
        });

        return jwt;
    }

    return null;
}


export {
    signIn,
    verifyOtp,
}