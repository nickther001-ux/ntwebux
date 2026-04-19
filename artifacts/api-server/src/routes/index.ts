import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import contactRouter from "./contact.js";
import chatRouter from "./chat.js";
import intakeRouter from "./intake.js";
import bookFreeRouter from "./bookFree.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(chatRouter);
router.use(intakeRouter);
router.use(bookFreeRouter);

export default router;
