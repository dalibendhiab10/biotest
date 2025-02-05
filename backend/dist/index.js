"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const typeorm_1 = require("typeorm");
const analyse_1 = __importDefault(require("./routes/analyse"));
const analyseCNAM_1 = __importDefault(require("./routes/analyseCNAM"));
const biologiste_1 = __importDefault(require("./routes/biologiste"));
const patient_1 = __importDefault(require("./routes/patient"));
const analyseCommande_1 = __importDefault(require("./routes/analyseCommande"));
const analyseCNAM_2 = require("./entities/analyseCNAM");
const analyse_2 = require("./entities/analyse");
const cors_1 = __importDefault(require("cors"));
const commande_1 = require("./entities/commande");
const biologiste_2 = require("./entities/biologiste");
const analysecommande_1 = require("./entities/analysecommande");
const dotenv_1 = __importDefault(require("dotenv"));
const patient_2 = require("./entities/patient");
const commande_2 = __importDefault(require("./routes/commande"));
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: process.env.TYPE,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [
        analyse_2.Analyse,
        analyseCNAM_2.Analyse_CNAM,
        commande_1.Commande,
        biologiste_2.Biologiste,
        analysecommande_1.Analyse_commande,
        patient_2.Patient,
    ],
    synchronize: true,
    logging: false,
});
exports.AppDataSource.initialize()
    .then(() => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(body_parser_1.default.urlencoded({ limit: "10mb", extended: true }));
    app.use((0, cors_1.default)({ origin: process.env.CLIENT }));
    app.use("/api", analyse_1.default);
    app.use(body_parser_1.default.json());
    app.use("/CNAM", analyseCNAM_1.default);
    app.use("/biologiste", biologiste_1.default);
    app.use("/panier", analyseCommande_1.default);
    app.use("/", patient_1.default);
    app.use("/", commande_2.default);
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
    .catch((error) => console.log("Error connecting to the database:", error));
