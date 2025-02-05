import { Request, Response } from "express";
import {
  createAnalyseService,
  deleteAnalyseService,
  getAnalyseByBioService,
  getAnalysesBioService,
  getAnalyseService,
  getAnalysesService,
  updateAnalyseService,
} from "../services/analyse";

export const createAnalyse = async (req: Request, res: Response) => {
  const {
    codeCNAM,
    nom,
    description,
    prix,
    durée,
    type_prelevement,
    technique,
    machine,
    temperature,
    urgent,
    specialité,
  } = req.body;

  try {
    const biologiste = (req as any).biologiste;

    const analyseData = {
      codeCNAM,
      nom,
      description,
      prix,
      durée,
      type_prelevement,
      technique,
      machine,
      temperature,
      urgent,
      specialité,
    };

    const savedAnalyse = await createAnalyseService(biologiste, analyseData);

    res.status(201).json(savedAnalyse);
  } catch (error) {
    console.error("Error creating analyse:", error);
    res.status(500).json({ message: "Error creating analyse", error });
  }
};

// Obtenir une analyse par ID analyses
export const getAnalyseByBio = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const analyse = await getAnalyseByBioService(id);

    if (!analyse) {
      return res.status(404).json({ message: "Analyse not found" });
    }
    res.status(200).json(analyse);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving analyse", error });
  }
};

//les analyses avec les informations de tous  biologistes
export const getAnalysesBio = async (req: Request, res: Response) => {
  try {
    const biologisteId = (req as any).biologiste.id;
    // Inclure les détails du biologiste associé
    const analyses = await getAnalysesBioService(biologisteId);
    res.status(200).json(analyses);
  } catch (error) {
    console.error("Error retrieving analyses with biologistes:", error);
    res
      .status(500)
      .json({ message: "Error retrieving analyses with biologistes", error });
  }
};

//les analyses faites par le biologiste authentifié
export const getAnalyses = async (req: Request, res: Response) => {
  try {
    const biologisteId = (req as any).biologiste.id;

    if (!biologisteId) {
      return res.status(400).json({ message: "Invalid biologiste ID" });
    }

    // Récupérer les analyses créées par le biologiste spécifique
    const analyses = await getAnalysesService(biologisteId);

    // Vérifiez si des analyses ont été trouvées
    if (analyses.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucune analyse trouvée pour ce biologiste" });
    }

    return res.status(200).json({ analyses });
  } catch (error) {
    console.error("Erreur lors de la récupération des analyses:", error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// Obtenir une analyse par ID
export const getAnalyse = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const analyse = await getAnalyseService(id);
    if (!analyse) {
      return res.status(404).json({ message: "Analyse not found" });
    }
    res.status(200).json(analyse);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving analyse", error });
  }
};

// Mettre à jour une analyse
export const updateAnalyse = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const {
    codeCNAM,
    nom,
    description,
    prix,
    durée,
    type_prelevement,
    technique,
    machine,
    temperature,
    urgent,
    specialité,
  } = req.body;

  // Check if the required field is present
  if (!codeCNAM) {
    return res.status(400).json({ message: "codeCNAM is required" });
  }

  try {
    const analyseData = {
      codeCNAM,
      nom,
      description,
      prix,
      durée,
      type_prelevement,
      technique,
      machine,
      temperature,
      urgent,
      specialité,
    };

    const updatedAnalyse = await updateAnalyseService(id, analyseData);

    res.status(200).json(updatedAnalyse);
  } catch (error: any) {
    if (error.message === "Analyse not found") {
      return res.status(404).json({ message: error.message });
    }

    console.error("Error updating analyse:", error);
    res.status(500).json({ message: "Error updating analyse", error });
  }
};

export const deleteAnalyse = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    await deleteAnalyseService(id);
    res.status(204).send();
  } catch (error: any) {
    if (error.message === "Analyse not found") {
      return res.status(404).json({ message: error.message });
    }

    console.error("Error deleting analyse:", error);
    res.status(500).json({ message: "Error deleting analyse", error });
  }
};
