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
const analyse_1 = require("../services/analyse");
const getAnalyseByCodeCNAM = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { codeCNAM } = req.params;
        const analyse = yield (0, analyse_1.getAnalyseByCodeCnamService)(codeCNAM);
        if (analyse) {
            res.status(200).json(analyse);
        }
        else {
            res.status(404).json({ message: "Analyse not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getAnalyseByCodeCNAM = getAnalyseByCodeCNAM;
