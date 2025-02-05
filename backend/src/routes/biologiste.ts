import { Router } from "express";
import { signup, login, getBiologists } from "../controllers/biologiste";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/biologists", getBiologists);

export default router;
