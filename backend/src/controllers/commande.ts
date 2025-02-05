import { Request, Response } from "express";
import {
  createCommandeService,
  getAllCommandesService,
} from "../services/commande";
import { getAnalysesService } from "../services/analyse";

export const createCommande = async (req: Request, res: Response) => {
  try {
    const { biologisteId, prixTotal, numCommande } = req.body;

    if (!biologisteId || prixTotal === undefined || numCommande === undefined) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const savedCommande = await createCommandeService(
      biologisteId,
      numCommande,
      prixTotal
    );

    res.status(201).json(savedCommande);
  } catch (error: any) {
    if (error.message === "Biologiste not found") {
      return res.status(404).json({ message: error.message });
    }
    console.error("Error creating commande:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get commande with patient, biologist and analyse
export const getAllCommandes = async (req: Request, res: Response) => {
  try {
    const biologisteId = (req as any).biologiste.id;

    const analyses = await getAnalysesService(biologisteId);

    const analysesIds = analyses.map((analyse: { id: number }) => analyse.id);

    const commandes = await getAllCommandesService(analysesIds);

    return res.status(200).json(commandes);
  } catch (error: any) {
    console.error("Erreur lors de la récupération des commandes:", error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
