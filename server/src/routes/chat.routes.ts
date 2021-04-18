import { Router } from "express";
import { chatController } from "../controllers";
const { createChat, getChat, updateChat, deleteChat } = chatController;

const router = Router();

router.post("/chat/conversation", getChat);
router.post("/chat", createChat);
router.put("/chat", updateChat);
router.delete("/chat", deleteChat);

export = router;
