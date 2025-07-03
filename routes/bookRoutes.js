import { Router } from 'express';
import {
  list,
  getById,
  create,
  update,
  remove
} from '../controllers/bookController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.use(auth);

router.get('/',       list);
router.get('/:id',    getById);
router.post('/',      create);
router.put('/:id',    update);
router.delete('/:id', remove);

export default router;
