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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const index_1 = require("../index");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const biologiste_1 = require("../entities/biologiste");
const saltRounds = 10;
const jwtSecret = "GGBhCvhpXHq1GuBOZ3XBr12GEP4zfLTOcYGtriYMdmOXo534mg9G1dgJUgFGH0DR";
// Inscription d'un biologiste
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { matricule_fiscale, num_tel1, num_tel2, personne_consacré, adresse, email, laboratoire, logo, coursier, password } = req.body;
        const biologisteRepository = index_1.AppDataSource.getRepository(biologiste_1.Biologiste);
        const existingBiologiste = yield biologisteRepository.findOne({ where: { email } });
        if (existingBiologiste) {
            return res.status(400).json({ message: 'Biologiste déjà inscrit' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, saltRounds);
        const newBiologiste = biologisteRepository.create({
            matricule_fiscale,
            num_tel1,
            num_tel2,
            personne_consacré,
            adresse,
            email,
            laboratoire,
            logo,
            coursier,
            password: hashedPassword
        });
        yield biologisteRepository.save(newBiologiste);
        res.status(201).json({ message: 'Inscription réussie' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'inscription', error });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const biologisteRepository = index_1.AppDataSource.getRepository(biologiste_1.Biologiste);
        const biologiste = yield biologisteRepository.findOne({ where: { email } });
        if (!biologiste) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, biologiste.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }
        const token = jsonwebtoken_1.default.sign({ id: biologiste.id }, jwtSecret, { expiresIn: '24h' });
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la connexion', error });
    }
});
exports.login = login;
