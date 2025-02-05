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
const patient_1 = require("../services/patient");
const analyse_1 = require("../services/analyse");
const commande_1 = require("../services/commande");
// Ajouter un patient
const addPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const biologisteId = req.biologiste.id;
        const { id_analyse } = req.params;
        const analyse = yield (0, analyse_1.getAnalyseByBioService)(parseInt(id_analyse));
        if (!analyse) {
            return res.status(404).json({ message: "Analyse non trouvé" });
        }
        const patient = yield (0, patient_1.addPatientService)(req.body);
        const commande = yield (0, commande_1.createCommandeService)(patient, analyse, biologisteId);
        res.status(201).json(patient);
    }
    catch (error) {
        console.error("Error adding patient:", error);
        res.status(500).json({ message: "Erreur lors de l'ajout du patient." });
    }
});
exports.addPatient = addPatient;
// Obtenir tous les patients
const getPatients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patients = yield (0, patient_1.getPatientsService)();
        res.json(patients);
    }
    catch (error) {
        console.error("Error fetching patients:", error);
        res
            .status(500)
            .json({ message: "Erreur lors de la récupération des patients." });
    }
});
exports.getPatients = getPatients;
// Obtenir un patient par ID
const getPatientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patient = yield (0, patient_1.getPatientByIdService)(req.params.id);
        if (patient) {
            res.json(patient);
        }
        else {
            res.status(404).json({ message: "Patient non trouvé." });
        }
    }
    catch (error) {
        console.error("Error fetching patient:", error);
        res
            .status(500)
            .json({ message: "Erreur lors de la récupération du patient." });
    }
});
exports.getPatientById = getPatientById;
// Mettre à jour un patient
const updatePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPatient = yield (0, patient_1.updatePatientService)(req.params.id, req.body);
        if (!updatedPatient) {
            return res.status(404).json({ message: "Patient non trouvé." });
        }
        return res.json(updatedPatient);
    }
    catch (error) {
        console.error("Error updating patient:", error);
        res
            .status(500)
            .json({ message: "Erreur lors de la mise à jour du patient." });
    }
});
exports.updatePatient = updatePatient;
// Supprimer un patient
const deletePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, patient_1.deletePatientService)(req.params.id);
        if (result.affected) {
            res.json({ message: "Patient supprimé avec succès." });
        }
        else {
            res.status(404).json({ message: "Patient non trouvé." });
        }
    }
    catch (error) {
        console.error("Error deleting patient:", error);
        res
            .status(500)
            .json({ message: "Erreur lors de la suppression du patient." });
    }
});
exports.deletePatient = deletePatient;
