import { Request, Response } from "express";
import {
  countAnalyseCommandeService,
  createAnalyseCommandeService,
  deleteAnalyseCommandeService,
  getAnalyseCommandesService,
} from "../services/analyseCommande";
import { getAllCommandesService } from "../services/commande";

//creation d une analyse commande
export const createAnalyseCommande = async (req: Request, res: Response) => {
  const { analyseId, delai_prevu, quantite } = req.body;
  const biologisteId = (req as any).biologiste.id;
  if (
    analyseId === undefined ||
    delai_prevu === undefined ||
    quantite === undefined
  ) {
    return res
      .status(400)
      .json({ message: "Bad Request: Missing required fields" });
  }

  try {
    const newAnalyseCommande = await createAnalyseCommandeService(
      analyseId,
      biologisteId,
      delai_prevu,
      quantite
    );
    return res.status(201).json(newAnalyseCommande);
  } catch (error: any) {
    if (
      error.message === "Analyse not found" ||
      error.message === "Biologiste not found"
    ) {
      return res.status(404).json({ message: error.message });
    }

    console.error("Error creating Analyse_commande:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//analyses commandes d un biologiste authentifié
export const getAnalyseCommandes = async (req: Request, res: Response) => {
  try {
    
    const biologisteId = (req as any).biologiste.id;


    if (!biologisteId) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    // Rechercher toutes les commandes d'analyse pour le biologiste authentifié
    const analyseCommandes = await     getAllCommandesService(biologisteId);

    // Vérifier si des commandes ont été trouvées
    if (analyseCommandes.length === 0) {
      return res.status(404).json({
        message: "Aucune analyse commandée trouvée pour ce biologiste",
      });
    }

    // Réponse avec toutes les commandes d'analyse trouvées
    return res.status(200).json(analyseCommandes);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des analyses commandées:",
      error
    );
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

export const deleteAnalyseCommande = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    await deleteAnalyseCommandeService(id);
    return res.status(204).send();
  } catch (error: any) {
    if (error.message === "Analyse commande not found") {
      return res.status(404).json({ message: error.message });
    }
    console.error("Error deleting Analyse_commande:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//nbre d analyse commandes par biologiste
export const getAnalyseCommandeCountById = async (
  req: Request,
  res: Response
) => {
  try {
    const biologisteId = (req as any).biologiste.id;

    if (!biologisteId) {
      return res.status(400).json({ message: "Invalid biologiste ID" });
    }

    // Compter le nombre d'analyses commandées pour un biologiste spécifique
    const count = await countAnalyseCommandeService(biologisteId);

    return res.status(200).json({ count });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du nombre d'analyses commandées:",
      error
    );
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
