"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    matricule_fiscale: zod_1.z.string().min(1, "Le matricule fiscale est requis"),
    /*   .regex(
        /^[0-9]{7}[A-Z]\/[A-Z]\/[A-Z]\/[0-9]{3}$/,
        "Le matricule fiscale doit suivre ce format : (ex. : 1234567X/Y/Z/000)"
      ), */ num_tel1: zod_1.z
        .number()
        .min(10000000, "Format du numéro de téléphone invalide")
        .max(99999999, "Format du numéro de téléphone invalide"),
    num_tel2: zod_1.z
        .number()
        .min(10000000, "Format du numéro de téléphone invalide")
        .max(99999999, "Format du numéro de téléphone invalide"),
    personne_consacré: zod_1.z.string().min(1, "La personne consacrée est requise"),
    adresse: zod_1.z.string().min(1, "L'adresse est requise"),
    email: zod_1.z.string().email("Format de l'email invalide"),
    laboratoire: zod_1.z.string().min(1, "Le laboratoire est requis"),
    logo: zod_1.z.string().min(1, "Le logo est requis"),
    coursier: zod_1.z.boolean(),
    password: zod_1.z
        .string()
        .min(12, "Le mot de passe doit comporter au moins 12 caractères") // Minimum length
        .max(20, "Le mot de passe doit comporter au maximum 20 caractères") // Maximum length
        .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une lettre majuscule") // At least one uppercase letter
        .regex(/[a-z]/, "Le mot de passe doit contenir au moins une lettre minuscule") // At least one lowercase letter
        .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre") // At least one number
        .regex(/[\W_]/, "Le mot de passe doit contenir au moins un caractère spécial"), // At least one special character
});
