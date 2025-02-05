import { AppDataSource } from "../index";
import { Analyse } from "../entities/analyse";
import { Biologiste } from "../entities/biologiste";
import { Analyse_CNAM } from "../entities/analyseCNAM";
import { Not } from "typeorm";

interface AnalyseData {
  codeCNAM: string;
  nom: string;
  description: string;
  prix: number;
  durée: number;
  type_prelevement: string;
  technique: string;
  machine: string;
  temperature: number;
  urgent: boolean;
  specialité: string;
}

export const createAnalyseService = async (
  biologiste: Biologiste,
  data: AnalyseData
) => {
  const analyseRepository = AppDataSource.getRepository(Analyse);

  const newAnalyse = new Analyse();
  newAnalyse.codeCNAM = data.codeCNAM;
  newAnalyse.nom = data.nom;
  newAnalyse.description = data.description;
  newAnalyse.prix = data.prix;
  newAnalyse.durée = data.durée;
  newAnalyse.type_prelevement = data.type_prelevement;
  newAnalyse.technique = data.technique;
  newAnalyse.machine = data.machine;
  newAnalyse.temperature = data.temperature;
  newAnalyse.urgent = data.urgent;
  newAnalyse.specialité = data.specialité;
  newAnalyse.biologiste = biologiste;

  return await analyseRepository.save(newAnalyse);
};

export const getAnalyseByBioService = async (id: number) => {
  const analyseRepository = AppDataSource.getRepository(Analyse);

  const analyse = await analyseRepository.findOne({
    where: { id },
    relations: ["biologiste"],
  });

  return analyse;
};

export const getAnalysesBioService = async (biologisteId: number) => {
  const analyseRepository = AppDataSource.getRepository(Analyse);

  const analyses = await analyseRepository.find({
    where: {
      biologiste: { id: 67 },
    },
    relations: ["biologiste"],
  });

  return analyses;
};

export const getAnalysesService = async (biologisteId: number) => {
  const analyseRepository = AppDataSource.getRepository(Analyse);

  const analyses = await analyseRepository.find({
    where: { biologiste: { id: biologisteId } },
  });

  return analyses;
};

export const getAnalyseService = async (id: number) => {
  const analyseRepository = AppDataSource.getRepository(Analyse);

  const analyse = await analyseRepository.findOneBy({ id });

  return analyse;
};

export const updateAnalyseService = async (id: number, data: AnalyseData) => {
  const analyseRepository = AppDataSource.getRepository(Analyse);

  const analyseToUpdate = await analyseRepository.findOneBy({ id });

  if (!analyseToUpdate) {
    throw new Error("Analyse not found");
  }

  analyseToUpdate.codeCNAM = data.codeCNAM;
  analyseToUpdate.nom = data.nom;
  analyseToUpdate.description = data.description;
  analyseToUpdate.prix = data.prix;
  analyseToUpdate.durée = data.durée;
  analyseToUpdate.type_prelevement = data.type_prelevement;
  analyseToUpdate.technique = data.technique;
  analyseToUpdate.machine = data.machine;
  analyseToUpdate.temperature = data.temperature;
  analyseToUpdate.urgent = data.urgent;
  analyseToUpdate.specialité = data.specialité;

  return await analyseRepository.save(analyseToUpdate);
};

export const deleteAnalyseService = async (id: number): Promise<void> => {
  const analyseRepository = AppDataSource.getRepository(Analyse);

  const analyseToDelete = await analyseRepository.findOneBy({ id });

  if (!analyseToDelete) {
    throw new Error("Analyse not found");
  }

  await analyseRepository.remove(analyseToDelete);
};

export const getAnalyseByCodeCnamService = async (
  codeCNAM: string
): Promise<Analyse_CNAM | null> => {
  const analyseRepository = AppDataSource.getRepository(Analyse_CNAM);
  const analyse = await analyseRepository.findOne({ where: { codeCNAM } });

  return analyse;
};
