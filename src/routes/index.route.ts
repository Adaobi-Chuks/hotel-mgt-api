import { Router } from 'express';
const router = Router();
import roomTypeRoute from './roomType.route';
import roomRoute from './room.route';
import userRoute from './user.route';

router.use('/rooms-types', roomTypeRoute);
router.use('/rooms', roomRoute);
router.use('/users', userRoute);

export default router;