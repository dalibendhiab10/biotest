import { Request, Response } from "express";
import { AppDataSource } from "../index";
import { Analyse_CNAM } from "../entities/analyseCNAM";
import { getAnalyseByCodeCnamService } from "../services/analyse";

export const getAnalyseByCodeCNAM = async (req: Request, res: Response) => {
  try {
    const { codeCNAM } = req.params;

    const analyse = await getAnalyseByCodeCnamService(codeCNAM);

    if (analyse) {
      res.status(200).json(analyse);
    } else {
      res.status(404).json({ message: "Analyse not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
