"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analyseCNAM_1 = require("../controllers/analyseCNAM");
const router = (0, express_1.Router)();
router.get('/analyse_cnam/:codeCNAM', analyseCNAM_1.getAnalyseByCodeCNAM);
exports.default = router;
