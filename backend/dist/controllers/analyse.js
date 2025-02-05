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
exports.deleteAnalyse = exports.updateAnalyse = exports.getAnalyse = exports.getAnalyses = exports.getAnalysesBio = exports.getAnalyseByBio = exports.createAnalyse = void 0;
const analyse_1 = require("../services/analyse");
const createAnalyse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codeCNAM, nom, description, prix, durée, type_prelevement, technique, machine, temperature, urgent, specialité, } = req.body;
    try {
        const biologiste = req.biologiste;
        const analyseData = {
            codeCNAM,
            nom,
            description,
            prix,
            durée,
            type_prelevement,
            technique,
            machine,
            temperature,
            urgent,
            specialité,
        };
        const savedAnalyse = yield (0, analyse_1.createAnalyseService)(biologiste, analyseData);
        res.status(201).json(savedAnalyse);
    }
    catch (error) {
        console.error("Error creating analyse:", error);
        res.status(500).json({ message: "Error creating analyse", error });
    }
});
exports.createAnalyse = createAnalyse;
// Obtenir une analyse par ID analyses
const getAnalyseByBio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }
    try {
        const analyse = yield (0, analyse_1.getAnalyseByBioService)(id);
        if (!analyse) {
            return res.status(404).json({ message: "Analyse not found" });
        }
        res.status(200).json(analyse);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving analyse", error });
    }
});
exports.getAnalyseByBio = getAnalyseByBio;
//les analyses avec les informations de tous  biologistes
const getAnalysesBio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const biologisteId = req.biologiste.id;
        // Inclure les détails du biologiste associé
        const analyses = yield (0, analyse_1.getAnalysesBioService)(biologisteId);
        res.status(200).json(analyses);
    }
    catch (error) {
        console.error("Error retrieving analyses with biologistes:", error);
        res
            .status(500)
            .json({ message: "Error retrieving analyses with biologistes", error });
    }
});
exports.getAnalysesBio = getAnalysesBio;
//les analyses faites par le biologiste authentifié
const getAnalyses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const biologisteId = req.biologiste.id;
        if (!biologisteId) {
            return res.status(400).json({ message: "Invalid biologiste ID" });
        }
        // Récupérer les analyses créées par le biologiste spécifique
        const analyses = yield (0, analyse_1.getAnalysesService)(biologisteId);
        // Vérifiez si des analyses ont été trouvées
        if (analyses.length === 0) {
            return res
                .status(404)
                .json({ message: "Aucune analyse trouvée pour ce biologiste" });
        }
        return res.status(200).json({ analyses });
    }
    catch (error) {
        console.error("Erreur lors de la récupération des analyses:", error);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }
});
exports.getAnalyses = getAnalyses;
// Obtenir une analyse par ID
const getAnalyse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }
    try {
        const analyse = yield (0, analyse_1.getAnalyseService)(id);
        if (!analyse) {
            return res.status(404).json({ message: "Analyse not found" });
        }
        res.status(200).json(analyse);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving analyse", error });
    }
});
exports.getAnalyse = getAnalyse;
// Mettre à jour une analyse
const updateAnalyse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }
    const { codeCNAM, nom, description, prix, durée, type_prelevement, technique, machine, temperature, urgent, specialité, } = req.body;
    // Check if the required field is present
    if (!codeCNAM) {
        return res.status(400).json({ message: "codeCNAM is required" });
    }
    try {
        const analyseData = {
            codeCNAM,
            nom,
            description,
            prix,
            durée,
            type_prelevement,
            technique,
            machine,
            temperature,
            urgent,
            specialité,
        };
        const updatedAnalyse = yield (0, analyse_1.updateAnalyseService)(id, analyseData);
        res.status(200).json(updatedAnalyse);
    }
    catch (error) {
        if (error.message === "Analyse not found") {
            return res.status(404).json({ message: error.message });
        }
        console.error("Error updating analyse:", error);
        res.status(500).json({ message: "Error updating analyse", error });
    }
});
exports.updateAnalyse = updateAnalyse;
const deleteAnalyse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }
    try {
        yield (0, analyse_1.deleteAnalyseService)(id);
        res.status(204).send();
    }
    catch (error) {
        if (error.message === "Analyse not found") {
            return res.status(404).json({ message: error.message });
        }
        console.error("Error deleting analyse:", error);
        res.status(500).json({ message: "Error deleting analyse", error });
    }
});
exports.deleteAnalyse = deleteAnalyse;
