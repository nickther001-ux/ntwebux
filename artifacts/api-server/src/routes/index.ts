import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import chatRouter from "./chat";
import intakeRouter from "./intake";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(chatRouter);
router.use(intakeRouter);

export default router;
