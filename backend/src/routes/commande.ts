import { Router } from "express";
import { createCommande, getAllCommandes } from "../controllers/commande";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();
router.use(authenticateToken);

router.post("/commander", createCommande);
router.get("/getAllCommandes", getAllCommandes);

export default router;
