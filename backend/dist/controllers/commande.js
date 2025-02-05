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
exports.getAllCommandes = exports.createCommande = void 0;
const commande_1 = require("../services/commande");
const analyse_1 = require("../services/analyse");
const createCommande = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { biologisteId, prixTotal, numCommande } = req.body;
        if (!biologisteId || prixTotal === undefined || numCommande === undefined) {
            return res.status(400).json({ message: "Invalid request" });
        }
        const savedCommande = yield (0, commande_1.createCommandeService)(biologisteId, numCommande, prixTotal);
        res.status(201).json(savedCommande);
    }
    catch (error) {
        if (error.message === "Biologiste not found") {
            return res.status(404).json({ message: error.message });
        }
        console.error("Error creating commande:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createCommande = createCommande;
// Get commande with patient, biologist and analyse
const getAllCommandes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const biologisteId = req.biologiste.id;
        const analyses = yield (0, analyse_1.getAnalysesService)(biologisteId);
        const analysesIds = analyses.map((analyse) => analyse.id);
        const commandes = yield (0, commande_1.getAllCommandesService)(analysesIds);
        return res.status(200).json(commandes);
    }
    catch (error) {
        console.error("Erreur lors de la récupération des commandes:", error);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }
});
exports.getAllCommandes = getAllCommandes;
