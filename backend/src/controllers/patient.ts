// src/handlers/patientHandler.ts
import { Request, Response } from "express";
import { AppDataSource } from "../index";
import { Patient } from "../entities/patient";
import {
  addPatientService,
  deletePatientService,
  getPatientByIdService,
  getPatientsService,
  updatePatientService,
} from "../services/patient";
import { getAnalyseByBioService } from "../services/analyse";
import { createCommandeService } from "../services/commande";

// Ajouter un patient
export const addPatient = async (req: Request, res: Response) => {
  try {
    const biologisteId = (req as any).biologiste.id;
    const { id_analyse } = req.params;

    const analyse = await getAnalyseByBioService(parseInt(id_analyse));

    if (!analyse) {
      return res.status(404).json({ message: "Analyse non trouvé" });
    }

    const patient = await addPatientService(req.body);

    const commande = await createCommandeService(
      patient,
      analyse,
      biologisteId
    );

    res.status(201).json(patient);
  } catch (error) {
    console.error("Error adding patient:", error);
    res.status(500).json({ message: "Erreur lors de l'ajout du patient." });
  }
};

// Obtenir tous les patients
export const getPatients = async (req: Request, res: Response) => {
  try {
    const patients = await getPatientsService();
    res.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des patients." });
  }
};

// Obtenir un patient par ID
export const getPatientById = async (req: Request, res: Response) => {
  try {
    const patient = await getPatientByIdService(req.params.id);
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ message: "Patient non trouvé." });
    }
  } catch (error) {
    console.error("Error fetching patient:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du patient." });
  }
};

// Mettre à jour un patient
export const updatePatient = async (req: Request, res: Response) => {
  try {
    const updatedPatient = await updatePatientService(req.params.id, req.body);

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient non trouvé." });
    }

    return res.json(updatedPatient);
  } catch (error) {
    console.error("Error updating patient:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du patient." });
  }
};

// Supprimer un patient
export const deletePatient = async (req: Request, res: Response) => {
  try {
    const result = await deletePatientService(req.params.id);
    if (result.affected) {
      res.json({ message: "Patient supprimé avec succès." });
    } else {
      res.status(404).json({ message: "Patient non trouvé." });
    }
  } catch (error) {
    console.error("Error deleting patient:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du patient." });
  }
};
