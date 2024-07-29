import { Router } from 'express';
import RoomController from '../controllers/rooms';
const router = Router();

router.get('/',RoomController.getRooms);
router.get('/:id',RoomController.getRoom);
router.post('/disconnect',RoomController.disconnect)

export default router;