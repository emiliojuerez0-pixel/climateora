/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: amenazasstride
 * Interface for STRIDEThreatModel
 */
export interface STRIDEThreatModel {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  acronymLetter?: string;
  /** @wixFieldType text */
  threatName?: string;
  /** @wixFieldType text */
  mitigationMeasure?: string;
  /** @wixFieldType text */
  riskDescription?: string;
  /** @wixFieldType text */
  impactLevel?: string;
}


/**
 * Collection ID: analisisecologico
 * Interface for AnlisisEcolgico
 */
export interface AnlisisEcolgico {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  generalCause?: string;
  /** @wixFieldType text */
  causeDetails?: string;
  /** @wixFieldType text */
  ecologicalImpactType?: string;
  /** @wixFieldType text */
  ecologicalImpactDetails?: string;
  /** @wixFieldType text */
  involvedActors?: string;
}


/**
 * Collection ID: estadisticassocioeconomicas
 * Interface for SocioeconomicStatistics
 */
export interface SocioeconomicStatistics {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  impactCategory?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  dataStats20122026?: string;
  /** @wixFieldType text */
  source?: string;
  /** @wixFieldType text */
  affectedRegion?: string;
}


/**
 * Collection ID: impactosclimaticos
 * Interface for ImpactosClimticos
 */
export interface ImpactosClimticos {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  locationName?: string;
  /** @wixFieldType number */
  latitude?: number;
  /** @wixFieldType number */
  longitude?: number;
  /** @wixFieldType text */
  keyStatistics?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  impactImage?: string;
  /** @wixFieldType text */
  source?: string;
}


/**
 * Collection ID: reportesciudadanos
 * Interface for ReportesCiudadanos
 */
export interface ReportesCiudadanos {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  eventDescription?: string;
  /** @wixFieldType text */
  province?: string;
  /** @wixFieldType text */
  corregimiento?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  eventPhoto?: string;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
}
