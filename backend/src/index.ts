import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import { DataSource } from "typeorm";
import analyseroute from "./routes/analyse";
import analysecnamroute from "./routes/analyseCNAM";
import biologisteroute from "./routes/biologiste";
import patientroute from "./routes/patient";
import analysecommanderoute from "./routes/analyseCommande";
import { Analyse_CNAM } from "./entities/analyseCNAM";
import { Analyse } from "./entities/analyse";
import cors from "cors";
import { Commande } from "./entities/commande";
import { Biologiste } from "./entities/biologiste";
import { Analyse_commande } from "./entities/analysecommande";
import dotenv from "dotenv";
import { Patient } from "./entities/patient";
import commanderoute from "./routes/commande";

dotenv.config();

export const AppDataSource = new DataSource({
  type: process.env.TYPE as "postgres",
  host: process.env.HOST,
  port: process.env.DB_PORT as number | undefined,
  username: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [
    Analyse,
    Analyse_CNAM,
    Commande,
    Biologiste,
    Analyse_commande,
    Patient,
  ],
  synchronize: true,
  logging: false,
});

AppDataSource.initialize()
  .then(() => {
    const app = express();

    // CORS middleware
    app.use(cors());

    app.use(express.json());
    app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

    // Test route
    app.get("/test", (req, res) => {
      res.status(200).json({ message: "CORS is enabled and server is running!" });
    });

    app.use("/aa", analyseroute);
    app.use(bodyParser.json());
    app.use("/CNAM", analysecnamroute);
    app.use("/biologiste", biologisteroute);
    app.use("/panier", analysecommanderoute);
    app.use("/", patientroute);
    app.use("/", commanderoute);

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("Error connecting to the database:", error));
