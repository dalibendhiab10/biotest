import { Router } from "express";
import { AppDataSource } from "..";
import { Commande } from "../entities/commande";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();
router.use(authenticateToken)
router.post("/confirm-analyse", async (req, res) => {
    const commandeRepo = AppDataSource.getRepository(Commande);
    const biologisteId = (req as any).biologiste.id;
    const commande = await commandeRepo.findOne({ where: { biologiste: biologisteId } });
    if (commande) {
        commande.etat_commande = req.body.etat_commande;

        res.status(200).json({ message: "Commande confirmed" });
    } else {
        res.status(404).json({ message: "Commande not found" });
    }


});

export default router;
