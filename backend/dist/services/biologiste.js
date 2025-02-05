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
exports.biologistsService = exports.loginService = exports.signupService = void 0;
const index_1 = require("../index");
const biologiste_1 = require("../entities/biologiste");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signupService = (matricule_fiscale, num_tel1, num_tel2, personne_consacré, adresse, email, laboratoire, logo, coursier, password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    const biologisteRepository = index_1.AppDataSource.getRepository(biologiste_1.Biologiste);
    const existingBiologiste = yield biologisteRepository.findOne({
        where: { email },
    });
    if (existingBiologiste) {
        throw new Error("Biologiste déjà inscrit");
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
        password: hashedPassword,
    });
    yield biologisteRepository.save(newBiologiste);
});
exports.signupService = signupService;
const loginService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const biologisteRepository = index_1.AppDataSource.getRepository(biologiste_1.Biologiste);
    const biologiste = yield biologisteRepository.findOne({ where: { email } });
    if (!biologiste) {
        throw new Error("Email ou mot de passe incorrect");
    }
    const isMatch = yield bcryptjs_1.default.compare(password, biologiste.password);
    if (!isMatch) {
        throw new Error("Email ou mot de passe incorrect");
    }
    const token = jsonwebtoken_1.default.sign({ id: biologiste.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return token;
});
exports.loginService = loginService;
const biologistsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const biologistRepository = index_1.AppDataSource.getRepository(biologiste_1.Biologiste);
    const biologists = yield biologistRepository.find();
    return biologists;
});
exports.biologistsService = biologistsService;
