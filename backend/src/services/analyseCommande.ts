import { Analyse } from "../entities/analyse";
import { Analyse_commande } from "../entities/analysecommande";
import { Biologiste } from "../entities/biologiste";
import { AppDataSource } from "../index";

export const createAnalyseCommandeService = async (
  analyseId: number,
  biologisteId: number,
  delai_prevu: string,
  quantite: number
) => {
  const analyseRepository = AppDataSource.getRepository(Analyse);
  const analyseCommandeRepository =
    AppDataSource.getRepository(Analyse_commande);
  const biologisteRepository = AppDataSource.getRepository(Biologiste);

  const analyse = await analyseRepository.findOne({ where: { id: analyseId } });
  const biologiste = await biologisteRepository.findOne({
    where: { id: biologisteId },
  });

  if (!analyse) {
    throw new Error("Analyse not found");
  }

  if (!biologiste) {
    throw new Error("Biologiste not found");
  }

  const newAnalyseCommande = new Analyse_commande();
  newAnalyseCommande.analyse = analyse;
  newAnalyseCommande.biologiste = biologiste;
  newAnalyseCommande.delai_prevu = new Date(delai_prevu);
  newAnalyseCommande.prix = analyse.prix;
  newAnalyseCommande.quantite = quantite;

  return await analyseCommandeRepository.save(newAnalyseCommande);
};

export const getAnalyseCommandesService = async (biologisteId: number) => {
  const analyseCommandeRepository =
    AppDataSource.getRepository(Analyse_commande);

  // Rechercher toutes les commandes d'analyse pour le biologiste authentifié
  const analyseCommandes = await analyseCommandeRepository.find({
    where: {
      biologiste: {
        id: biologisteId,
      },
    },
    relations: ["analyse", "analyse.biologiste"],
  });

  return analyseCommandes;
};

export const deleteAnalyseCommandeService = async (id: number) => {
  const analyseCommandeRepository =
    AppDataSource.getRepository(Analyse_commande);

  const analyseCommandeToDelete = await analyseCommandeRepository.findOneBy({
    id,
  });

  if (!analyseCommandeToDelete) {
    throw new Error("Analyse commande not found");
  }

  await analyseCommandeRepository.remove(analyseCommandeToDelete);
};

export const countAnalyseCommandeService = async (biologisteId: number) => {
  const analyseCommandeRepository =
    AppDataSource.getRepository(Analyse_commande);

  // Compter le nombre d'analyses commandées pour un biologiste spécifique
  const count = await analyseCommandeRepository.count({
    where: { biologiste: { id: biologisteId } },
  });

  return count;
};
