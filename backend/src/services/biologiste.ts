import { AppDataSource } from "../index";
import { Biologiste } from "../entities/biologiste";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signupService = async (
  matricule_fiscale: string,
  num_tel1: number,
  num_tel2: number,
  personne_consacré: string,
  adresse: string,
  email: string,
  laboratoire: string,
  logo: string,
  coursier: boolean,
  password: string
) => {
  const saltRounds = 10;

  const biologisteRepository = AppDataSource.getRepository(Biologiste);
  const existingBiologiste = await biologisteRepository.findOne({
    where: { email },
  });

  if (existingBiologiste) {
    throw new Error("Biologiste déjà inscrit");
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newBiologiste = biologisteRepository.create({
    matricule_fiscale,
    num_tel1,
    num_tel2,
    personne_consacré,
    adresse,
    email,
    laboratoire,
    logo,
    coursier,
    password: hashedPassword,
  });

  await biologisteRepository.save(newBiologiste);
};

export const loginService = async (email: string, password: string) => {
  const biologisteRepository = AppDataSource.getRepository(Biologiste);
  const biologiste = await biologisteRepository.findOne({ where: { email } });

  if (!biologiste) {
    throw new Error("Email ou mot de passe incorrect");
  }

  const isMatch = await bcrypt.compare(password, biologiste.password);

  if (!isMatch) {
    throw new Error("Email ou mot de passe incorrect");
  }

  const token = jwt.sign(
    { id: biologiste.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return token;
};

export const biologistsService = async () => {
  const biologistRepository = AppDataSource.getRepository(Biologiste);

  const biologists = await biologistRepository.find();

  return biologists;
};
