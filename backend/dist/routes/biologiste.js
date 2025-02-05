"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const biologiste_1 = require("../controllers/biologiste");
const router = (0, express_1.Router)();
router.post("/signup", biologiste_1.signup);
router.post("/login", biologiste_1.login);
router.get("/biologists", biologiste_1.getBiologists);
exports.default = router;
