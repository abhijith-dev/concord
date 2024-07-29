import { Router } from 'express';
import { userValidationMiddleware } from '../middlewares';
import userControllers from '../controllers/users';
const router = Router();

router.post('/onboard',...userValidationMiddleware(),userControllers.onboard);
router.post('/verify',...userValidationMiddleware(),userControllers.verifyuser);
router.post('/authentication',userControllers.authentication);
router.patch('/displayname',...userValidationMiddleware(),userControllers.displayName);
router.get('/',userControllers.users);


export default router;