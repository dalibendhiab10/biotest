import { Router } from "express";
import {
  createAnalyseCommande,
  deleteAnalyseCommande,
  getAnalyseCommandeCountById,
  getAnalyseCommandes,
} from "../controllers/analyseCommande";
import { authenticateToken } from "../middlewares/authMiddleware";
const router = Router();

router.post("/analysecommande", authenticateToken, createAnalyseCommande);
router.get("/analysecommande", authenticateToken, getAnalyseCommandes);
router.delete("/analysecommande/:id", authenticateToken, deleteAnalyseCommande);

router.get("/count", authenticateToken, getAnalyseCommandeCountById);

export default router;
