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
exports.getAllCommandesService = exports.createCommandeService = void 0;
const index_1 = require("../index");
const biologiste_1 = require("../entities/biologiste");
const commande_1 = require("../entities/commande");
const typeorm_1 = require("typeorm");
const createCommandeService = (patient, analyse, biologisteId) => __awaiter(void 0, void 0, void 0, function* () {
    const biologisteRepository = index_1.AppDataSource.getRepository(biologiste_1.Biologiste);
    const biologiste = yield biologisteRepository.findOne({
        where: { id: biologisteId },
    });
    if (!biologiste) {
        throw new Error("Biologiste not found");
    }
    const commandeRepository = index_1.AppDataSource.getRepository(commande_1.Commande);
    const commande = new commande_1.Commande();
    commande.date_commande = new Date();
    commande.prix_total = analyse.prix;
    commande.biologiste = biologiste;
    commande.analyse = analyse;
    commande.patient = patient;
    const savedCommande = yield commandeRepository.save(commande);
    return savedCommande;
});
exports.createCommandeService = createCommandeService;
const getAllCommandesService = (analysesIds) => __awaiter(void 0, void 0, void 0, function* () {
    const commandeRepository = index_1.AppDataSource.getRepository(commande_1.Commande);
    const commandes = yield commandeRepository.find({
        where: {
            analyse: {
                id: (0, typeorm_1.In)(analysesIds),
            },
        },
        relations: ["analyse", "patient", "biologiste"],
    });
    return commandes;
});
exports.getAllCommandesService = getAllCommandesService;
