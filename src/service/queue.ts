import { EmailObj } from "../interface/email";
import { Queue, Worker } from 'bullmq';
import { email } from "../config";

const queue = new Queue('email-queue', {
    connection: {
        host: 'localhost',
        port: 6379
    }
});

const worker = new Worker('email-queue', async (job) => {
    if (job.name === 'send-email') {
        const data = job.data;
        await email.sendMail(data);
    }
},
    {
        connection: {
            host: 'localhost',
            port: 6379
        }
    }
)

const addToQueue = async (data: EmailObj) => {
    queue.add('send-email', data);
}

export {
    addToQueue,
    worker
}