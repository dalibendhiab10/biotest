import { Request, Response } from "express";
import {
  biologistsService,
  loginService,
  signupService,
} from "../services/biologiste";
import { signupSchema } from "../schemas/biologiste";
import { z } from "zod";

// Inscription d'un biologiste
export const signup = async (req: Request, res: Response) => {
  try {
    const validatedData = signupSchema.parse(req.body);

    const {
      matricule_fiscale,
      num_tel1,
      num_tel2,
      personne_consacré,
      adresse,
      email,
      laboratoire,
      logo,
      coursier,
      password,
    } = validatedData;

    await signupService(
      matricule_fiscale,
      num_tel1,
      num_tel2,
      personne_consacré,
      adresse,
      email,
      laboratoire,
      logo,
      coursier,
      password
    );

    res.status(201).json({ message: "Inscription réussie" });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      // If validation fails, map the ZodError to show schema messages
      const validationErrors = error.errors.map((err) => ({
        field: err.path.join("."), // Which field failed validation
        message: err.message, // The specific error message from the schema
      }));

      return res
        .status(400)
        .json({ message: "Invalid input data", errors: validationErrors });
    }

    if (error.message === "Biologiste déjà inscrit") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Erreur lors de l'inscription", error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const token = await loginService(email, password);

    res.status(200).json({ token });
  } catch (error: any) {
    if (error.message === "Email ou mot de passe incorrect") {
      return res.status(401).json({ message: error.message });
    }

    res.status(500).json({ message: "Erreur lors de la connexion", error });
  }
};

// Get all biologists
export const getBiologists = async (req: Request, res: Response) => {
  try {
    const biologists = await biologistsService();
    res.status(200).json(biologists);
  } catch (error: any) {
    console.error("Error retrieving  biologists with its analysis:", error);

    res.status(500).json({
      message: "Error Network",
      error,
    });
  }
};
