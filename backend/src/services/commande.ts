import { AppDataSource } from "../index";
import { Biologiste } from "../entities/biologiste";
import { Commande } from "../entities/commande";
import { Analyse } from "../entities/analyse";
import { Patient } from "../entities/patient";
import { In } from "typeorm";

export const createCommandeService = async (
  patient: Patient,
  analyse: Analyse,
  biologisteId: number
) => {
  const biologisteRepository = AppDataSource.getRepository(Biologiste);
  const biologiste = await biologisteRepository.findOne({
    where: { id: biologisteId },
  });

  if (!biologiste) {
    throw new Error("Biologiste not found");
  }

  const commandeRepository = AppDataSource.getRepository(Commande);

  const commande = new Commande();
  commande.date_commande = new Date();
  commande.prix_total = analyse.prix;
  commande.biologiste = biologiste;
  commande.analyse = analyse;
  commande.patient = patient;

  const savedCommande = await commandeRepository.save(commande);

  return savedCommande;
};

export const getAllCommandesService = async (analysesIds: number[]) => {
  const commandeRepository = AppDataSource.getRepository(Commande);

  const commandes = await commandeRepository.find({
    where: {
      analyse: {
        id: In(analysesIds),
      },
    },
    relations: ["analyse", "patient", "biologiste"],
  });

  return commandes;
};
