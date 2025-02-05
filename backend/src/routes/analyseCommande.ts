import { Router } from "express";
import {
  createAnalyseCommande,
  deleteAnalyseCommande,
  getAnalyseCommandeCountById,
  getAnalyseCommandes,
} from "../controllers/analyseCommande";

const router = Router();

router.post("/analysecommande", createAnalyseCommande);
router.get("/analysecommande", getAnalyseCommandes);
router.delete("/analysecommande/:id", deleteAnalyseCommande);

router.get("/count", getAnalyseCommandeCountById);

export default router;
