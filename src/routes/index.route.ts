import { Router } from 'express';
const router = Router();
import roomTypeRoute from './roomType.route';
import roomRoute from './room.route';
import userRoute from './user.route';

router.use('/rooms-types', roomTypeRoute);
router.use('/rooms', roomRoute);
router.use('/users', userRoute);

//redirects users to API documentation when they navigate to "/docs"
router.use("/docs", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/22416364/2s93RZNqMa");
})

export default router;