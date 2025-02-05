import { AppDataSource } from "../index";
import { Patient } from "../entities/patient";

export const addPatientService = async (data: Patient) => {
  const patientRepo = AppDataSource.getRepository(Patient);
  const patient = patientRepo.create(data);
  await patientRepo.save(patient);

  return patient;
};

export const getPatientsService = async () => {
  const patientRepo = AppDataSource.getRepository(Patient);
  const patients = await patientRepo.find();

  return patients;
};

export const getPatientByIdService = async (id: string) => {
  const patientRepo = AppDataSource.getRepository(Patient);
  const patient = await patientRepo.findOne({ where: { id: parseInt(id) } });

  return patient;
};

export const updatePatientService = async (
  id: string,
  updateData: Partial<Patient>
) => {
  const patientRepo = AppDataSource.getRepository(Patient);
  const patient = await patientRepo.findOne({ where: { id: parseInt(id) } });

  if (!patient) {
    return null;
  }

  patientRepo.merge(patient, updateData);
  await patientRepo.save(patient);

  return patient;
};

export const deletePatientService = async (id: string) => {
  const patientRepo = AppDataSource.getRepository(Patient);
  const result = await patientRepo.delete(parseInt(id));

  return result;
};
