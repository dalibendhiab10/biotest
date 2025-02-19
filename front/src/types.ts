export interface Analyse {
  id: number;
  nom: string;
  codeCNAM: string;
  prix: number;
  durée: string;

  volume: number;

  type_prelevement: string;
  technique: string;
  automate: string;
  temperature: 'ambiante' | 'congelée' | 'refrigérée';
  biologiste?: Biologiste;
  urgent: boolean;
}


export interface Biologiste {
  id: number;
  matricule_fiscale: string;
  num_tel1: number;
  num_tel2: number;
  personne_consacré: string;
  adresse: string;
  email: string;
  password: string;
  laboratoire: string;
  logo: string;
  coursier: boolean;

  //commandes?: Commande[];  // Assurez-vous que le type Commande est défini si vous utilisez des commandes
}

export interface AnalyseCNAM {
  id: number;
  analyses?: Analyse[];
}

export interface Analyse_commande {
  id: number;
  analyse: Analyse | undefined;
  delai_prevu: Date | undefined;
  prix: number;
  quantite: number;
  patientId?: number;
  biologiste: Biologiste;
}
export interface Patient {
  id?: number;
  sexe: string;
  nom: string;
  prenom: string;
  date_naissance?: Date;
  numcarte: number;
  reference: string;
  DDR?: Date;
  date_deb_grossesse?: Date;
  nbrefoetus: number;
  date_prelevement?: Date;
  heure_prelevement: number;
  diurese: number;
  nbretube: number;
  temp: number;
  congele: boolean;
  urgent: boolean;
  enceinte: boolean;
  commentaire?: string;
  /*analyseCommande?: Analyse_commande;*/
}




export type FilterAnalyse = {
  examen?: string | number;
  nature_prelevement?: string;
  specialite?: string;
  technique?: string;
  temperature?: number;
  tarification?: number;
};

export interface Commande {
  id: number;
  date_commande: Date;
  prix_total: number;
  etat_commande: string;
  analyse: Analyse;
  patient: Patient;
  biologiste: Biologiste;
}
