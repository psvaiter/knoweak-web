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

    organizationId: number;
    selectedMacroprocessId: number;
}
  
export class OrganizationMacroprocess {
    instanceId: number;
    id: number;
    name: string;
    processes: OrganizationProcess[] = [];
    
    organizationId: number;
    department: OrganizationDepartment;

    selectedProcessId: number;
    selectedProcessRelevanceId: number;
}
  
export class OrganizationProcess {
    instanceId: number;
    id: number;
    name: string;
    itServices: OrganizationItService[] = [];
    relevance: RatingLevel;

    organizationId: number;
    macroprocess: OrganizationMacroprocess;

    selectedItServiceId: number;
    selectedItServiceRelevanceId: number;
}
  
export class OrganizationItService {
    instanceId: number;
    id: number;
    name: string;
    itAssets: OrganizationItAsset[] = [];
    relevance: RatingLevel;
    
    organizationId: number;
    process: OrganizationProcess;
    
    selectedItem: any;
    selectedExternalIdentifier: string;
    selectedItAssetRelevanceId: number;
}
  
export class OrganizationItAsset {
    instanceId: number;
    id: number;
    name: string;
    externalIdentifier: string;
    relevance: RatingLevel;
    
    organizationId: number;
    itService: OrganizationItService;
}

export class RatingLevel {
    id: number;
    name: string;
}