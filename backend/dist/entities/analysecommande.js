"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Analyse_commande = void 0;
const typeorm_1 = require("typeorm");
const analyse_1 = require("./analyse");
const biologiste_1 = require("./biologiste");
const patient_1 = require("./patient");
let Analyse_commande = class Analyse_commande {
    constructor() {
        this.id = 0;
        this.prix = 0;
        this.quantite = 0;
    }
};
exports.Analyse_commande = Analyse_commande;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Analyse_commande.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => biologiste_1.Biologiste),
    __metadata("design:type", Object)
], Analyse_commande.prototype, "biologiste", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => analyse_1.Analyse, (analyse) => analyse),
    __metadata("design:type", Object)
], Analyse_commande.prototype, "analyse", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Object)
], Analyse_commande.prototype, "delai_prevu", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float" }),
    __metadata("design:type", Number)
], Analyse_commande.prototype, "prix", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], Analyse_commande.prototype, "quantite", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => patient_1.Patient, (patient) => patient.analyseCommande),
    __metadata("design:type", Object)
], Analyse_commande.prototype, "patients", void 0);
exports.Analyse_commande = Analyse_commande = __decorate([
    (0, typeorm_1.Entity)()
], Analyse_commande);
