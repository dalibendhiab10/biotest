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
exports.Commande = void 0;
const typeorm_1 = require("typeorm");
const biologiste_1 = require("./biologiste");
const patient_1 = require("./patient");
const analyse_1 = require("./analyse");
let Commande = class Commande {
    constructor() {
        this.prix_total = 0;
        this.etat_commande = "En Attente";
    }
};
exports.Commande = Commande;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Commande.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Object)
], Commande.prototype, "date_commande", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    (0, typeorm_1.Generated)("increment"),
    __metadata("design:type", Number)
], Commande.prototype, "numcommander", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float" }),
    __metadata("design:type", Number)
], Commande.prototype, "prix_total", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => patient_1.Patient, (patient) => patient.commande, { cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", patient_1.Patient)
], Commande.prototype, "patient", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Commande.prototype, "etat_commande", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => biologiste_1.Biologiste, (biologiste) => biologiste.commandes, {
        nullable: true,
    }),
    __metadata("design:type", Object)
], Commande.prototype, "biologiste", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => analyse_1.Analyse, { cascade: true }),
    __metadata("design:type", analyse_1.Analyse)
], Commande.prototype, "analyse", void 0);
exports.Commande = Commande = __decorate([
    (0, typeorm_1.Entity)()
], Commande);
