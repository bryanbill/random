import express, { Express } from 'express';
import cors from 'cors';
import { json } from 'body-parser';

import { config, sequelize, redisClient } from './config';
import router from './router';
import { queue } from './service';
import cronJob from './cron';

/**
 * Initialize the express app and connect to the database
 */
const init = async (): Promise<Express> => {
    const app: Express = express();

    await sequelize.authenticate();
    await sequelize.sync();

    await redisClient.connect();

    app.use(cors());
    app.use(json())
    app.use(express.urlencoded({ extended: true }));
    app.use(`/${config.App.Version}`, router);

    queue.worker.on('completed', (job) => {
        console.log(`Job with id ${job.id} has been completed`);
    })

    queue.worker.on('failed', (job, err) => {
        console.error(`Job with id ${job?.id} has failed with error: ${err}`);
    })

    return app;
}

init().then((app) => {
    app.listen(config.App.Port, () => {
        console.log(`Server is running on port ${config.App.Port}`);
    });

    // start the cron jobs
    cronJob();
}).catch((err) => {
    console.error(err);
})


