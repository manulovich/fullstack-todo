import { Router } from 'express';
import ApiController from '../controllers/api.js';

const router = Router();

router.get('/statistics', ApiController.statistics);
router.put('/user/:token/new-task', ApiController.newTask);
router.get('/user/:token/tasks', ApiController.tasks);
router.delete('/user/:token/delete/:idx', ApiController.delete);

export default router;
