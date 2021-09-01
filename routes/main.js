import { Router } from 'express';
import MainController from '../controllers/main.js';

const router = Router();

router.get('/login', MainController.login);
router.get('/registration', MainController.registration);
router.get('/greetings', MainController.greetings);
router.get('/', MainController.main);
router.get('/home/:token', MainController.home);

export default router;
