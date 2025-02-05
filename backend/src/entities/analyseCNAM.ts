import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Analyse } from "./analyse";

@Entity()
export class Analyse_CNAM {
  @PrimaryColumn({ name: "codeCNAM" })
  codeCNAM: string = "";

  @Column()
  nom: string = "";

  @Column()
  description: string = "";

  @Column()
  specialité: string = "";
  @Column({ nullable: true })
  motcle: string = "";

  @OneToMany(() => Analyse, (analyse) => analyse.analyseCNAM)
  analyses: Analyse[] | undefined;
}
