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
exports.Biologiste = void 0;
const typeorm_1 = require("typeorm");
const commande_1 = require("./commande");
const analyse_1 = require("./analyse");
let Biologiste = class Biologiste {
    constructor() {
        this.id = 0;
        this.matricule_fiscale = "";
        this.num_tel1 = 0;
        this.num_tel2 = 0;
        this.personne_consacré = "";
        this.adresse = "";
        this.email = "";
        this.password = "";
        this.laboratoire = "";
        this.logo = "";
        this.coursier = false;
    }
};
exports.Biologiste = Biologiste;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Biologiste.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Biologiste.prototype, "matricule_fiscale", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint" }),
    __metadata("design:type", Number)
], Biologiste.prototype, "num_tel1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint" }),
    __metadata("design:type", Number)
], Biologiste.prototype, "num_tel2", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Biologiste.prototype, "personne_consacr\u00E9", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Biologiste.prototype, "adresse", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Biologiste.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Biologiste.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Biologiste.prototype, "laboratoire", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Biologiste.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Biologiste.prototype, "coursier", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => commande_1.Commande, (commande) => commande.biologiste),
    __metadata("design:type", Object)
], Biologiste.prototype, "commandes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => analyse_1.Analyse, (analyse) => analyse.biologiste),
    __metadata("design:type", Object)
], Biologiste.prototype, "analyses", void 0);
exports.Biologiste = Biologiste = __decorate([
    (0, typeorm_1.Entity)()
], Biologiste);
