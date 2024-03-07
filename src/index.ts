import express, { Express } from 'express';
import cors from 'cors';
import { json } from 'body-parser';

import { config, sequelize } from './config';
import router from './router';

/**
 * Initialize the express app and connect to the database
 */
const init = async (): Promise<Express> => {
    const app: Express = express();

    await sequelize.authenticate();

    app.use(cors())
        .use(json())
        .use(`${config.App.Version}`, router)

    return app;

}

init().then((app) => {
    app.listen(config.App.Port, () => {
        console.log(`Server is running on port ${config.App.Port}`);
    });
}).catch((err) => {
    console.error(err);
})


