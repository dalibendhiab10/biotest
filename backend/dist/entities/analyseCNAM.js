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
exports.Analyse_CNAM = void 0;
const typeorm_1 = require("typeorm");
const analyse_1 = require("./analyse");
let Analyse_CNAM = class Analyse_CNAM {
    constructor() {
        this.codeCNAM = "";
        this.nom = "";
        this.description = "";
        this.specialité = "";
        this.motcle = "";
    }
};
exports.Analyse_CNAM = Analyse_CNAM;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: "codeCNAM" }),
    __metadata("design:type", String)
], Analyse_CNAM.prototype, "codeCNAM", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Analyse_CNAM.prototype, "nom", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Analyse_CNAM.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Analyse_CNAM.prototype, "specialit\u00E9", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Analyse_CNAM.prototype, "motcle", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => analyse_1.Analyse, (analyse) => analyse.analyseCNAM),
    __metadata("design:type", Object)
], Analyse_CNAM.prototype, "analyses", void 0);
exports.Analyse_CNAM = Analyse_CNAM = __decorate([
    (0, typeorm_1.Entity)()
], Analyse_CNAM);
