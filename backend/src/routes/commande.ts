import { Router } from "express";
import { createCommande, getAllCommandes } from "../controllers/commande";

const router = Router();

router.post("/commander", createCommande);
router.get("/getAllCommandes", getAllCommandes);

export default router;
