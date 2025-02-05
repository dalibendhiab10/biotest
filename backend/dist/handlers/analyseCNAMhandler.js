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
exports.getAnalyseByCodeCNAM = void 0;
const index_1 = require("../index");
const analyseCNAM_1 = require("../entities/analyseCNAM");
const getAnalyseByCodeCNAM = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { codeCNAM } = req.params;
        const analyseRepository = index_1.AppDataSource.getRepository(analyseCNAM_1.Analyse_CNAM);
        const analyse = yield analyseRepository.findOne({ where: { codeCNAM } });
        if (analyse) {
            res.json(analyse);
        }
        else {
            res.status(404).json({ message: 'Analyse not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getAnalyseByCodeCNAM = getAnalyseByCodeCNAM;
