"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePatientService = exports.updatePatientService = exports.getPatientByIdService = exports.getPatientsService = exports.addPatientService = void 0;
const index_1 = require("../index");
const patient_1 = require("../entities/patient");
const addPatientService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const patientRepo = index_1.AppDataSource.getRepository(patient_1.Patient);
    const patient = patientRepo.create(data);
    yield patientRepo.save(patient);
    return patient;
});
exports.addPatientService = addPatientService;
const getPatientsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const patientRepo = index_1.AppDataSource.getRepository(patient_1.Patient);
    const patients = yield patientRepo.find();
    return patients;
});
exports.getPatientsService = getPatientsService;
const getPatientByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const patientRepo = index_1.AppDataSource.getRepository(patient_1.Patient);
    const patient = yield patientRepo.findOne({ where: { id: parseInt(id) } });
    return patient;
});
exports.getPatientByIdService = getPatientByIdService;
const updatePatientService = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const patientRepo = index_1.AppDataSource.getRepository(patient_1.Patient);
    const patient = yield patientRepo.findOne({ where: { id: parseInt(id) } });
    if (!patient) {
        return null;
    }
    patientRepo.merge(patient, updateData);
    yield patientRepo.save(patient);
    return patient;
});
exports.updatePatientService = updatePatientService;
const deletePatientService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const patientRepo = index_1.AppDataSource.getRepository(patient_1.Patient);
    const result = yield patientRepo.delete(parseInt(id));
    return result;
});
exports.deletePatientService = deletePatientService;
