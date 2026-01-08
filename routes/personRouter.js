import express from 'express';
import { getAllPersons, getPersonById, addPerson, updatePersonById, deletePersonById } from '../controllers/personController.js';

const router = express.Router();


router.get('/', getAllPersons);
router.get('/:id', getPersonById);
router.post('/', addPerson);
router.put('/:id', updatePersonById);
router.delete('/:id', deletePersonById);

export default router;