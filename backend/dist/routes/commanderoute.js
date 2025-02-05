"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commande_1 = require("../controllers/commande");
const router = (0, express_1.Router)();
router.post('/commander', commande_1.createCommande);
exports.default = router;
