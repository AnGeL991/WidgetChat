import { Router } from "express";
import { botController } from "../controllers";
const { getSetting, newSetting } = botController;

const router = Router();

router.get("/bot", getSetting);
router.put("/bot", newSetting);

export = router;
