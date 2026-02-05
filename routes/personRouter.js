import express from 'express';
import { getAllPersons, getPersonById, addPerson, updatePersonById, deletePersonById, loginPerson } from '../controllers/personController.js';
import { limiter } from '../middleware/rateLimiter.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', limiter, loginPerson);

// Public (Signup)
router.post('/signup', limiter, addPerson);

// Protected Routes
router.get('/', protect, authorize('admin', 'user'), limiter, getAllPersons);
router.get('/:id', protect, authorize('admin', 'user'), limiter, getPersonById);
router.put('/:id', protect, authorize('admin', 'user'), limiter, updatePersonById);
router.delete('/:id', protect, authorize('admin'), limiter, deletePersonById);

export default router;