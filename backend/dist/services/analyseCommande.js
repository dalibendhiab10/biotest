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
exports.countAnalyseCommandeService = exports.deleteAnalyseCommandeService = exports.getAnalyseCommandesService = exports.createAnalyseCommandeService = void 0;
const analyse_1 = require("../entities/analyse");
const analysecommande_1 = require("../entities/analysecommande");
const biologiste_1 = require("../entities/biologiste");
const index_1 = require("../index");
const createAnalyseCommandeService = (analyseId, biologisteId, delai_prevu, quantite) => __awaiter(void 0, void 0, void 0, function* () {
    const analyseRepository = index_1.AppDataSource.getRepository(analyse_1.Analyse);
    const analyseCommandeRepository = index_1.AppDataSource.getRepository(analysecommande_1.Analyse_commande);
    const biologisteRepository = index_1.AppDataSource.getRepository(biologiste_1.Biologiste);
    const analyse = yield analyseRepository.findOne({ where: { id: analyseId } });
    const biologiste = yield biologisteRepository.findOne({
        where: { id: biologisteId },
    });
    if (!analyse) {
        throw new Error("Analyse not found");
    }
    if (!biologiste) {
        throw new Error("Biologiste not found");
    }
    const newAnalyseCommande = new analysecommande_1.Analyse_commande();
    newAnalyseCommande.analyse = analyse;
    newAnalyseCommande.biologiste = biologiste;
    newAnalyseCommande.delai_prevu = new Date(delai_prevu);
    newAnalyseCommande.prix = analyse.prix;
    newAnalyseCommande.quantite = quantite;
    return yield analyseCommandeRepository.save(newAnalyseCommande);
});
exports.createAnalyseCommandeService = createAnalyseCommandeService;
const getAnalyseCommandesService = (biologisteId) => __awaiter(void 0, void 0, void 0, function* () {
    const analyseCommandeRepository = index_1.AppDataSource.getRepository(analysecommande_1.Analyse_commande);
    // Rechercher toutes les commandes d'analyse pour le biologiste authentifié
    const analyseCommandes = yield analyseCommandeRepository.find({
        where: {
            biologiste: {
                id: biologisteId,
            },
        },
        relations: ["analyse", "analyse.biologiste"],
    });
    return analyseCommandes;
});
exports.getAnalyseCommandesService = getAnalyseCommandesService;
const deleteAnalyseCommandeService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const analyseCommandeRepository = index_1.AppDataSource.getRepository(analysecommande_1.Analyse_commande);
    const analyseCommandeToDelete = yield analyseCommandeRepository.findOneBy({
        id,
    });
    if (!analyseCommandeToDelete) {
        throw new Error("Analyse commande not found");
    }
    yield analyseCommandeRepository.remove(analyseCommandeToDelete);
});
exports.deleteAnalyseCommandeService = deleteAnalyseCommandeService;
const countAnalyseCommandeService = (biologisteId) => __awaiter(void 0, void 0, void 0, function* () {
    const analyseCommandeRepository = index_1.AppDataSource.getRepository(analysecommande_1.Analyse_commande);
    // Compter le nombre d'analyses commandées pour un biologiste spécifique
    const count = yield analyseCommandeRepository.count({
        where: { biologiste: { id: biologisteId } },
    });
    return count;
});
exports.countAnalyseCommandeService = countAnalyseCommandeService;
