import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Analyse_CNAM } from "./analyseCNAM";
import { Biologiste } from "./biologiste";
import { Commande } from "./commande";

@Entity()
export class Analyse extends Analyse_CNAM {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  codeCNAM: string = "";

  @Column()
  nom: string = "";

  @Column()
  description: string = "";

  @Column()
  prix: number = 0;

  @Column()
  durée: number = 0;

  @Column()
  type_prelevement: string = "";

  @Column()
  technique: string = "";

  @Column()
  machine: string = "";

  @Column()
  temperature: number = 0;

  @Column()
  urgent: boolean = false;

  @Column({ type: "varchar", length: 255 })
  specialité: string = "";

  @ManyToOne(() => Biologiste, (biologiste) => biologiste.analyses)
  biologiste: Biologiste | undefined;

  @ManyToOne(() => Analyse_CNAM, (analyseCNAM) => analyseCNAM.analyses)
  analyseCNAM: Analyse_CNAM | undefined;
}
