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
exports.createCommande = void 0;
const index_1 = require("../index");
const commande_1 = require("../entities/commande");
const biologiste_1 = require("../entities/biologiste");
const createCommande = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { biologisteId, prixTotal, numCommande } = req.body;
        if (!biologisteId || prixTotal === undefined || numCommande === undefined) {
            return res.status(400).json({ message: 'Invalid request' });
        }
        const biologisteRepository = index_1.AppDataSource.getRepository(biologiste_1.Biologiste);
        const biologiste = yield biologisteRepository.findOne({ where: { id: biologisteId } });
        if (!biologiste) {
            return res.status(404).json({ message: 'Biologiste not found' });
        }
        const commandeRepository = index_1.AppDataSource.getRepository(commande_1.Commande);
        const commande = new commande_1.Commande();
        commande.date_commande = new Date();
        commande.numcommander = numCommande;
        commande.prix_total = prixTotal;
        commande.biologiste = biologiste;
        const savedCommande = yield commandeRepository.save(commande);
        res.status(201).json(savedCommande);
    }
    catch (error) {
        console.error('Error creating commande:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.createCommande = createCommande;
