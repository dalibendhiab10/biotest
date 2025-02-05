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
exports.getAnalyseByCodeCnamService = exports.deleteAnalyseService = exports.updateAnalyseService = exports.getAnalyseService = exports.getAnalysesService = exports.getAnalysesBioService = exports.getAnalyseByBioService = exports.createAnalyseService = void 0;
const index_1 = require("../index");
const analyse_1 = require("../entities/analyse");
const analyseCNAM_1 = require("../entities/analyseCNAM");
const typeorm_1 = require("typeorm");
const createAnalyseService = (biologiste, data) => __awaiter(void 0, void 0, void 0, function* () {
    const analyseRepository = index_1.AppDataSource.getRepository(analyse_1.Analyse);
    const newAnalyse = new analyse_1.Analyse();
    newAnalyse.codeCNAM = data.codeCNAM;
    newAnalyse.nom = data.nom;
    newAnalyse.description = data.description;
    newAnalyse.prix = data.prix;
    newAnalyse.durée = data.durée;
    newAnalyse.type_prelevement = data.type_prelevement;
    newAnalyse.technique = data.technique;
    newAnalyse.machine = data.machine;
    newAnalyse.temperature = data.temperature;
    newAnalyse.urgent = data.urgent;
    newAnalyse.specialité = data.specialité;
    newAnalyse.biologiste = biologiste;
    return yield analyseRepository.save(newAnalyse);
});
exports.createAnalyseService = createAnalyseService;
const getAnalyseByBioService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const analyseRepository = index_1.AppDataSource.getRepository(analyse_1.Analyse);
    const analyse = yield analyseRepository.findOne({
        where: { id },
        relations: ["biologiste"],
    });
    return analyse;
});
exports.getAnalyseByBioService = getAnalyseByBioService;
const getAnalysesBioService = (biologisteId) => __awaiter(void 0, void 0, void 0, function* () {
    const analyseRepository = index_1.AppDataSource.getRepository(analyse_1.Analyse);
    const analyses = yield analyseRepository.find({
        where: {
            biologiste: { id: (0, typeorm_1.Not)(biologisteId) },
        },
        relations: ["biologiste"],
    });
    return analyses;
});
exports.getAnalysesBioService = getAnalysesBioService;
const getAnalysesService = (biologisteId) => __awaiter(void 0, void 0, void 0, function* () {
    const analyseRepository = index_1.AppDataSource.getRepository(analyse_1.Analyse);
    const analyses = yield analyseRepository.find({
        where: { biologiste: { id: biologisteId } },
    });
    return analyses;
});
exports.getAnalysesService = getAnalysesService;
const getAnalyseService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const analyseRepository = index_1.AppDataSource.getRepository(analyse_1.Analyse);
    const analyse = yield analyseRepository.findOneBy({ id });
    return analyse;
});
exports.getAnalyseService = getAnalyseService;
const updateAnalyseService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const analyseRepository = index_1.AppDataSource.getRepository(analyse_1.Analyse);
    const analyseToUpdate = yield analyseRepository.findOneBy({ id });
    if (!analyseToUpdate) {
        throw new Error("Analyse not found");
    }
    analyseToUpdate.codeCNAM = data.codeCNAM;
    analyseToUpdate.nom = data.nom;
    analyseToUpdate.description = data.description;
    analyseToUpdate.prix = data.prix;
    analyseToUpdate.durée = data.durée;
    analyseToUpdate.type_prelevement = data.type_prelevement;
    analyseToUpdate.technique = data.technique;
    analyseToUpdate.machine = data.machine;
    analyseToUpdate.temperature = data.temperature;
    analyseToUpdate.urgent = data.urgent;
    analyseToUpdate.specialité = data.specialité;
    return yield analyseRepository.save(analyseToUpdate);
});
exports.updateAnalyseService = updateAnalyseService;
const deleteAnalyseService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const analyseRepository = index_1.AppDataSource.getRepository(analyse_1.Analyse);
    const analyseToDelete = yield analyseRepository.findOneBy({ id });
    if (!analyseToDelete) {
        throw new Error("Analyse not found");
    }
    yield analyseRepository.remove(analyseToDelete);
});
exports.deleteAnalyseService = deleteAnalyseService;
const getAnalyseByCodeCnamService = (codeCNAM) => __awaiter(void 0, void 0, void 0, function* () {
    const analyseRepository = index_1.AppDataSource.getRepository(analyseCNAM_1.Analyse_CNAM);
    const analyse = yield analyseRepository.findOne({ where: { codeCNAM } });
    return analyse;
});
exports.getAnalyseByCodeCnamService = getAnalyseByCodeCnamService;
