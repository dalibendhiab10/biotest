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
exports.getBiologists = exports.login = exports.signup = void 0;
const biologiste_1 = require("../services/biologiste");
const biologiste_2 = require("../schemas/biologiste");
const zod_1 = require("zod");
// Inscription d'un biologiste
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = biologiste_2.signupSchema.parse(req.body);
        const { matricule_fiscale, num_tel1, num_tel2, personne_consacré, adresse, email, laboratoire, logo, coursier, password, } = validatedData;
        yield (0, biologiste_1.signupService)(matricule_fiscale, num_tel1, num_tel2, personne_consacré, adresse, email, laboratoire, logo, coursier, password);
        res.status(201).json({ message: "Inscription réussie" });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            // If validation fails, map the ZodError to show schema messages
            const validationErrors = error.errors.map((err) => ({
                field: err.path.join("."), // Which field failed validation
                message: err.message, // The specific error message from the schema
            }));
            return res
                .status(400)
                .json({ message: "Invalid input data", errors: validationErrors });
        }
        if (error.message === "Biologiste déjà inscrit") {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Erreur lors de l'inscription", error });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const token = yield (0, biologiste_1.loginService)(email, password);
        res.status(200).json({ token });
    }
    catch (error) {
        if (error.message === "Email ou mot de passe incorrect") {
            return res.status(401).json({ message: error.message });
        }
        res.status(500).json({ message: "Erreur lors de la connexion", error });
    }
});
exports.login = login;
// Get all biologists
const getBiologists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const biologists = yield (0, biologiste_1.biologistsService)();
        res.status(200).json(biologists);
    }
    catch (error) {
        console.error("Error retrieving  biologists with its analysis:", error);
        res.status(500).json({
            message: "Error Network",
            error,
        });
    }
});
exports.getBiologists = getBiologists;
