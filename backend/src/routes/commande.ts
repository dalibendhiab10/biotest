import { Router } from "express";
import { createCommande, getAllCommandes } from "../controllers/commande";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/commander", createCommande);
router.get("/getAllCommandes", authenticateToken, getAllCommandes);

export default router;
