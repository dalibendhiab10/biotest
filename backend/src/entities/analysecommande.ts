import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Commande } from "./commande";
import { Analyse } from "./analyse";
import { Biologiste } from "./biologiste";
import { Patient } from "./patient";

@Entity()
export class Analyse_commande {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @ManyToOne(() => Biologiste)
  biologiste: Biologiste | undefined;

  @ManyToOne(() => Analyse, (analyse) => analyse)
  analyse: Analyse | undefined;

  @Column({ type: "date" })
  delai_prevu: Date | undefined;

  @Column({ type: "float" })
  prix: number = 0;

  @Column({ type: "int" })
  quantite: number = 0;

  @OneToMany(() => Patient, (patient) => patient.analyseCommande)
  patients: Patient[] | undefined;
}
