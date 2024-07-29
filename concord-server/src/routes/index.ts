import { Router,Response,Request } from "express";
import HelperMiddleware from "../middlewares/helper";

const router:Router = Router();

// server Health Check
router.get('/health-check',HelperMiddleware,(req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is up and running!' });
});


export default router;
