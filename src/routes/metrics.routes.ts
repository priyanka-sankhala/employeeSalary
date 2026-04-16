import { Router } from 'express';
import { MetricsController } from '../controllers/metrics.controller';

const router = Router();
const controller = new MetricsController();


router.get("/country/:country", controller.countryMetrics);
router.get("/job/:jobTitle", controller.jobTitleMetrics);


export default router;
