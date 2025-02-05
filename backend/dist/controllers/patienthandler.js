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
exports.deletePatient = exports.updatePatient = exports.getPatientById = exports.getPatients = exports.addPatient = void 0;
const index_1 = require("../index");
const patient_1 = require("../entities/patient");
// Ajouter un patient
const addPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientRepo = index_1.AppDataSource.getRepository(patient_1.Patient);
        const patient = patientRepo.create(req.body);
        yield patientRepo.save(patient);
        res.status(201).json(patient);
    }
    catch (error) {
        console.error('Error adding patient:', error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout du patient.' });
    }
});
exports.addPatient = addPatient;
// Obtenir tous les patients
const getPatients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientRepo = index_1.AppDataSource.getRepository(patient_1.Patient);
        const patients = yield patientRepo.find();
        res.json(patients);
    }
    catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des patients.' });
    }
});
exports.getPatients = getPatients;
// Obtenir un patient par ID
const getPatientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientRepo = index_1.AppDataSource.getRepository(patient_1.Patient);
        const patient = yield patientRepo.findOne({ where: { id: parseInt(req.params.id) } });
        if (patient) {
            res.json(patient);
        }
        else {
            res.status(404).json({ message: 'Patient non trouvé.' });
        }
    }
    catch (error) {
        console.error('Error fetching patient:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération du patient.' });
    }
});
exports.getPatientById = getPatientById;
// Mettre à jour un patient
const updatePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientRepo = index_1.AppDataSource.getRepository(patient_1.Patient);
        const patient = yield patientRepo.findOne({ where: { id: parseInt(req.params.id) } });
        if (patient) {
            patientRepo.merge(patient, req.body);
            yield patientRepo.save(patient);
            res.json(patient);
        }
        else {
            res.status(404).json({ message: 'Patient non trouvé.' });
        }
    }
    catch (error) {
        console.error('Error updating patient:', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du patient.' });
    }
});
exports.updatePatient = updatePatient;
// Supprimer un patient
const deletePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientRepo = index_1.AppDataSource.getRepository(patient_1.Patient);
        const result = yield patientRepo.delete(parseInt(req.params.id));
        if (result.affected) {
            res.json({ message: 'Patient supprimé avec succès.' });
        }
        else {
            res.status(404).json({ message: 'Patient non trouvé.' });
        }
    }
    catch (error) {
        console.error('Error deleting patient:', error);
        res.status(500).json({ message: 'Erreur lors de la suppression du patient.' });
    }
});
exports.deletePatient = deletePatient;
