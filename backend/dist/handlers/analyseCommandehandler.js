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
exports.getAnalyseCommandeCountById = exports.deleteAnalyseCommande = exports.getAnalyseCommandes = exports.createAnalyseCommande = void 0;
const index_1 = require("../index");
const analysecommande_1 = require("../entities/analysecommande");
const analyse_1 = require("../entities/analyse");
const biologiste_1 = require("../entities/biologiste");
//creation d une analyse commande
const createAnalyseCommande = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { analyseId, delai_prevu, quantite } = req.body;
    const biologisteId = req.biologiste.id;
    if (analyseId === undefined || delai_prevu === undefined || quantite === undefined) {
        return res.status(400).json({ message: 'Bad Request: Missing required fields' });
    }
    try {
        const analyseRepository = index_1.AppDataSource.getRepository(analyse_1.Analyse);
        const analyseCommandeRepository = index_1.AppDataSource.getRepository(analysecommande_1.Analyse_commande);
        const biologisteRepository = index_1.AppDataSource.getRepository(biologiste_1.Biologiste);
        const analyse = yield analyseRepository.findOne({ where: { id: analyseId } });
        const biologiste = yield biologisteRepository.findOne({ where: { id: biologisteId } });
        if (!analyse) {
            return res.status(404).json({ message: 'Analyse not found' });
        }
        if (!biologiste) {
            return res.status(404).json({ message: 'Biologiste not found' });
        }
        const newAnalyseCommande = new analysecommande_1.Analyse_commande();
        newAnalyseCommande.analyse = analyse;
        newAnalyseCommande.biologiste = biologiste;
        newAnalyseCommande.delai_prevu = new Date(delai_prevu);
        newAnalyseCommande.prix = analyse.prix;
        newAnalyseCommande.quantite = quantite;
        yield analyseCommandeRepository.save(newAnalyseCommande);
        return res.status(201).json(newAnalyseCommande);
    }
    catch (error) {
        console.error('Error creating Analyse_commande:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.createAnalyseCommande = createAnalyseCommande;
//analyses commandes d un biologiste authentifié
const getAnalyseCommandes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const biologisteId = req.biologiste.id;
        if (!biologisteId) {
            return res.status(401).json({ message: 'Utilisateur non authentifié' });
        }
        const analyseCommandeRepository = index_1.AppDataSource.getRepository(analysecommande_1.Analyse_commande);
        // Rechercher toutes les commandes d'analyse pour le biologiste authentifié
        const analyseCommandes = yield analyseCommandeRepository.find({
            where: {
                biologiste: {
                    id: biologisteId
                }
            },
            relations: [
                'analyse',
                'analyse.biologiste'
            ]
        });
        // Vérifier si des commandes ont été trouvées
        if (analyseCommandes.length === 0) {
            return res.status(404).json({ message: 'Aucune analyse commandée trouvée pour ce biologiste' });
        }
        // Réponse avec toutes les commandes d'analyse trouvées
        return res.status(200).json(analyseCommandes);
    }
    catch (error) {
        console.error('Erreur lors de la récupération des analyses commandées:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});
exports.getAnalyseCommandes = getAnalyseCommandes;
const deleteAnalyseCommande = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }
    try {
        const analyseCommandeRepository = index_1.AppDataSource.getRepository(analysecommande_1.Analyse_commande);
        const analyseCommandeToDelete = yield analyseCommandeRepository.findOneBy({ id });
        if (!analyseCommandeToDelete) {
            return res.status(404).json({ message: 'Analyse commande not found' });
        }
        yield analyseCommandeRepository.remove(analyseCommandeToDelete);
        return res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting Analyse_commande:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.deleteAnalyseCommande = deleteAnalyseCommande;
//nbre d analyse commandes par biologiste
const getAnalyseCommandeCountById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const biologisteId = req.biologiste.id;
        if (!biologisteId) {
            return res.status(400).json({ message: 'Invalid biologiste ID' });
        }
        const analyseCommandeRepository = index_1.AppDataSource.getRepository(analysecommande_1.Analyse_commande);
        // Compter le nombre d'analyses commandées pour un biologiste spécifique
        const count = yield analyseCommandeRepository.count({ where: { biologiste: { id: biologisteId } } });
        return res.status(200).json({ count });
    }
    catch (error) {
        console.error('Erreur lors de la récupération du nombre d\'analyses commandées:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});
exports.getAnalyseCommandeCountById = getAnalyseCommandeCountById;
