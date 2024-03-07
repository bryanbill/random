import { Router } from "express";
import { auth, journal } from "../controller";
import { authMiddleware } from "../middleware";

const router: Router = Router();

/**
 * Retrieves all entries for a user
 */
router.get('/', authMiddleware, async (req, res) => {
    try {
        const journals = await journal.getAllJournals(req.user.id);
        res.status(200).json({
            status: 0,
            message: 'Success',
            data: journals,
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
 * Retrieves a single entry for a user
 */
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const response = await journal.getJournal(req.user.id, req.params.id);
        res.status(200).json({
            status: 0,
            message: 'Success',
            data: response,
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
 * Creates a new entry for a user
 * 
 * Expects a JSON object with the following properties:
 * - title: string
 * - content: string
 * - date: string
 * 
 */
router.post('/', authMiddleware, async (req, res) => {
    try {
        const response = await journal.createJournal(req.user.id, req.body);
        res.status(201).json({
            status: 0,
            message: 'Success',
            data: response,
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
 * Delete an entry for a user
 */
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const response = await journal.deleteJournal(req.user.id, req.params.id);
        res.status(200).json({
            status: 0,
            message: 'Success',
            data: response,
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