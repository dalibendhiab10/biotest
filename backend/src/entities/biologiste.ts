import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Commande } from "./commande";
import { Analyse } from "./analyse";

@Entity()
export class Biologiste {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  matricule_fiscale: string = "";

  @Column({ type: "bigint" })
  num_tel1: number = 0;

  @Column({ type: "bigint" })
  num_tel2: number = 0;

  @Column()
  personne_consacré: string = "";

  @Column()
  adresse: string = "";

  @Column()
  email: string = "";

  @Column()
  password: string = "";

  @Column()
  laboratoire: string = "";

  @Column()
  logo: string = "";

  @Column()
  coursier: boolean = false;

  @OneToMany(() => Commande, (commande) => commande.biologiste)
  commandes: Commande[] | undefined;

  @OneToMany(() => Analyse, (analyse) => analyse.biologiste)
  analyses: Analyse[] | undefined;
}
