export class Organization {
    id: number;
    taxId: string;
    legalName: string;
    tradeName: string;
    createdOn: Date;
    lastModifiedOn: Date;
    departments: OrganizationDepartment[] = [];
}

export class OrganizationDepartment {
    id: number;
    name: string;
    macroprocesses: OrganizationMacroprocess[] = [];
    
    expanded: boolean = false;
    selectedMacroprocessId: number;
}
  
export class OrganizationMacroprocess {
    instanceId: number;
    id: number;
    name: string;
    processes: OrganizationProcess[] = [];
    
    expanded: boolean = false;
    selectedProcessId: number;
    selectedProcessRelevanceId: number;
}
  
export class OrganizationProcess {
    instanceId: number;
    id: number;
    name: string;
    itServices: OrganizationItService[] = [];
    relevance: RatingLevel;

    expanded: boolean = false;
    selectedItServiceId: number;
    selectedItServiceRelevanceId: number;
}
  
export class OrganizationItService {
    instanceId: number;
    id: number;
    name: string;
    itAssets: OrganizationItAsset[] = [];
    relevance: RatingLevel;
    
    expanded: boolean = false;
    selectedItAssetId: number;
    selectedItAssetRelevanceId: number;
}
  
export class OrganizationItAsset {
    instanceId: number;
    id: number;
    name: string;
    externalIdentifier: string;
    relevance: RatingLevel;
}

export class RatingLevel {
    id: number;
    name: string;
}