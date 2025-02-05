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
exports.Analyse = void 0;
const typeorm_1 = require("typeorm");
const analyseCNAM_1 = require("./analyseCNAM");
const biologiste_1 = require("./biologiste");
let Analyse = class Analyse extends analyseCNAM_1.Analyse_CNAM {
    constructor() {
        super(...arguments);
        this.id = 0;
        this.codeCNAM = "";
        this.nom = "";
        this.description = "";
        this.prix = 0;
        this.durée = 0;
        this.type_prelevement = "";
        this.technique = "";
        this.machine = "";
        this.temperature = 0;
        this.urgent = false;
        this.specialité = "";
    }
};
exports.Analyse = Analyse;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Analyse.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Analyse.prototype, "codeCNAM", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Analyse.prototype, "nom", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Analyse.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Analyse.prototype, "prix", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Analyse.prototype, "dur\u00E9e", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Analyse.prototype, "type_prelevement", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Analyse.prototype, "technique", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Analyse.prototype, "machine", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Analyse.prototype, "temperature", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Analyse.prototype, "urgent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Analyse.prototype, "specialit\u00E9", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => biologiste_1.Biologiste, (biologiste) => biologiste.analyses),
    __metadata("design:type", Object)
], Analyse.prototype, "biologiste", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => analyseCNAM_1.Analyse_CNAM, (analyseCNAM) => analyseCNAM.analyses),
    __metadata("design:type", Object)
], Analyse.prototype, "analyseCNAM", void 0);
exports.Analyse = Analyse = __decorate([
    (0, typeorm_1.Entity)()
], Analyse);
