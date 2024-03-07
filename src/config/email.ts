import nodemailer from 'nodemailer';
import { config } from '.';

const transporter = nodemailer.createTransport({
    service: config.Smtp.Service,
    auth: {
        user: config.Smtp.User,
        pass: config.Smtp.Pass
    }
});

export default transporter;