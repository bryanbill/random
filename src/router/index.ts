import { Router } from 'express';

import authRouter from './auth';
import journalRouter from './journal';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/journals', journalRouter);

export default router;