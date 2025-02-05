import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
  Generated,
} from "typeorm";
import { Biologiste } from "./biologiste";
import { Analyse_commande } from "./analysecommande";
import { Patient } from "./patient";
import { Analyse } from "./analyse";

@Entity()
export class Commande {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "date", nullable: true })
  date_commande: Date | null | undefined;

  @Column({ type: "int" })
  @Generated("increment")
  numcommander!: number;

  @Column({ type: "float" })
  prix_total: number = 0;

  @OneToOne(() => Patient, (patient) => patient.commande, { cascade: true })
  @JoinColumn()
  patient!: Patient;

  @Column()
  etat_commande: string = "En Attente";

  @ManyToOne(() => Biologiste, (biologiste) => biologiste.commandes, {
    nullable: true,
  })
  biologiste: Biologiste | null | undefined;

  @ManyToOne(() => Analyse, { cascade: true })
  analyse!: Analyse;
}
