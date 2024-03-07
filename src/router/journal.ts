import { Router } from "express";

const router: Router = Router();

/**
 * Retrieves all entries for a user
 */
router.get('/', (req, res) => { });

/**
 * Retrieves a single entry for a user
 */
router.get('/:id', (req, res) => { });

/**
 * Creates a new entry for a user
 * 
 * Expects a JSON object with the following properties:
 * - title: string
 * - content: string
 * - date: string
 * 
 */
router.post('/', (req, res) => { });

/**
 * Delete an entry for a user
 */
router.delete('/:id', (req, res) => { });


export default router;