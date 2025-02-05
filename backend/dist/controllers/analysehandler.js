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
const index_1 = require("../index");
const analyse_1 = require("../entities/analyse");
const createAnalyse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const analyseRepository = index_1.AppDataSource.getRepository(analyse_1.Analyse);
    const { codeCNAM, nom, description, prix, durée, type_prelevement, technique, machine, temperature, urgent, specialité } = req.body;
    try {
        const biologiste = req.biologiste;
        const newAnalyse = new analyse_1.Analyse();
        newAnalyse.codeCNAM = codeCNAM;
        newAnalyse.nom = nom;
        newAnalyse.description = description;
        newAnalyse.prix = prix;
        newAnalyse.durée = durée;
        newAnalyse.type_prelevement = type_prelevement;
        newAnalyse.technique = technique;
        newAnalyse.machine = machine;
        newAnalyse.temperature = temperature;
        newAnalyse.urgent = urgent;
        newAnalyse.specialité = specialité;
        newAnalyse.biologiste = biologiste;
        const savedAnalyse = yield analyseRepository.save(newAnalyse);
        res.status(201).json(savedAnalyse);
    }
    catch (error) {
        console.error('Error creating analyse:', error);
        res.status(500).json({ message: 'Error creating analyse', error });
    }
});
exports.createAnalyse = createAnalyse;
// Obtenir une analyse par ID analyses 
const getAnalyseByBio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const analyseRepository = index_1.AppDataSource.getRepository(analyse_1.Analyse);
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }
    try {
        const analyse = yield analyseRepository.findOne({ where: { id }, relations: ['biologiste'] });
        if (!analyse) {
            return res.status(404).json({ message: 'Analyse not found' });
        }
        res.status(200).json(analyse);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving analyse', error });
    }
});
exports.getAnalyseByBio = getAnalyseByBio;
//les analyses avec les informations de tous  biologistes
const getAnalysesBio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const analyseRepository = index_1.AppDataSource.getRepository(analyse_1.Analyse);
    try {
        // Inclure les détails du biologiste associé
        const analyses = yield analyseRepository.find({ relations: ['biologiste'] });
        res.status(200).json(analyses);
    }
    catch (error) {
        console.error('Error retrieving analyses with biologistes:', error);
        res.status(500).json({ message: 'Error retrieving analyses with biologistes', error });
    }
});
exports.getAnalysesBio = getAnalysesBio;
//les analyses faites par le biologiste authentifié
const getAnalyses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const biologisteId = req.biologiste.id;
        if (!biologisteId) {
            return res.status(400).json({ message: 'Invalid biologiste ID' });
        }
        const analyseRepository = index_1.AppDataSource.getRepository(analyse_1.Analyse);
        // Récupérer les analyses créées par le biologiste spécifique
        const analyses = yield analyseRepository.find({ where: { biologiste: { id: biologisteId } } });
        // Vérifiez si des analyses ont été trouvées
        if (analyses.length === 0) {
            return res.status(404).json({ message: 'Aucune analyse trouvée pour ce biologiste' });
        }
        return res.status(200).json({ analyses });
    }
    catch (error) {
        console.error('Erreur lors de la récupération des analyses:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});
exports.getAnalyses = getAnalyses;
// Obtenir une analyse par ID
const getAnalyse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const analyseRepository = index_1.AppDataSource.getRepository(analyse_1.Analyse);
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }
    try {
        const analyse = yield analyseRepository.findOneBy({ id });
        if (!analyse) {
            return res.status(404).json({ message: 'Analyse not found' });
        }
        res.status(200).json(analyse);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving analyse', error });
    }
});
exports.getAnalyse = getAnalyse;
// Mettre à jour une analyse
const updateAnalyse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const analyseRepository = index_1.AppDataSource.getRepository(analyse_1.Analyse);
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }
    const { codeCNAM, nom, description, prix, durée, type_prelevement, technique, machine, temperature, urgent, specialité } = req.body;
    // Vérifiez si toutes les valeurs requises sont présentes
    if (!codeCNAM) {
        return res.status(400).json({ message: 'codeCNAM is required' });
    }
    try {
        const analyseToUpdate = yield analyseRepository.findOneBy({ id });
        if (!analyseToUpdate) {
            return res.status(404).json({ message: 'Analyse not found' });
        }
        analyseToUpdate.codeCNAM = codeCNAM;
        analyseToUpdate.nom = nom;
        analyseToUpdate.description = description;
        analyseToUpdate.prix = prix;
        analyseToUpdate.durée = durée;
        analyseToUpdate.type_prelevement = type_prelevement;
        analyseToUpdate.technique = technique;
        analyseToUpdate.machine = machine;
        analyseToUpdate.temperature = temperature;
        analyseToUpdate.urgent = urgent;
        analyseToUpdate.specialité = specialité;
        const updatedAnalyse = yield analyseRepository.save(analyseToUpdate);
        res.status(200).json(updatedAnalyse);
    }
    catch (error) {
        console.error('Error updating analyse:', error);
        res.status(500).json({ message: 'Error updating analyse', error });
    }
});
exports.updateAnalyse = updateAnalyse;
const deleteAnalyse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const analyseRepository = index_1.AppDataSource.getRepository(analyse_1.Analyse);
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }
    try {
        const analyseToDelete = yield analyseRepository.findOneBy({ id });
        if (!analyseToDelete) {
            return res.status(404).json({ message: 'Analyse not found' });
        }
        yield analyseRepository.remove(analyseToDelete);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting analyse', error });
    }
});
exports.deleteAnalyse = deleteAnalyse;
