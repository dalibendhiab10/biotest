import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
} from "typeorm";
import { Analyse_commande } from "./analysecommande";
import { Commande } from "./commande";

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sexe: string = "";

  @Column()
  nom: string = "";

  @Column()
  prenom: string = "";

  @Column({ type: "date", nullable: true })
  date_naissance: Date | undefined;

  @Column()
  numcarte: number = 0;

  @Column()
  reference: string = "";

  @Column({ type: "date", nullable: true })
  DDR: Date | undefined;

  @Column({ type: "date", nullable: true })
  date_deb_grossesse: Date | undefined;

  @Column({ default: 0 })
  nbrefoetus: number = 0;

  @Column({ type: "date", nullable: true })
  date_prelevement: Date | undefined;

  @Column({ default: 0 })
  heure_prelevement: number = 0;

  @Column({ default: 0 })
  diurèse: number = 0;

  @Column({ default: 0 })
  nbretube: number = 0;

  @Column({ default: 0 })
  temp: number = 0;

  @Column()
  congelé: boolean = false;

  @Column()
  urgent: boolean = false;

  @ManyToOne(
    () => Analyse_commande,
    (analyseCommande) => analyseCommande.patients
  )
  analyseCommande: Analyse_commande | undefined;

  @OneToOne(() => Commande, (commande) => commande.patient)
  commande!: Commande;
}
