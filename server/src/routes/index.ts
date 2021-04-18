import { Router } from "express";
import botRoutes from "./bot.routes";
import chatRoutes from "./chat.routes";

const router = Router();

router.use(botRoutes);
router.use(chatRoutes);

export = router;
