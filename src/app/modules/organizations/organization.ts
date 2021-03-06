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
}
  
export class OrganizationMacroprocess {
    instanceId: number;
    id: number;
    name: string;
    processes: OrganizationProcess[] = [];
    
    organizationId: number;
    department: OrganizationDepartment;
}
  
export class OrganizationProcess {
    instanceId: number;
    id: number;
    name: string;
    relevance: RatingLevel;
    itServices: OrganizationItService[] = [];

    organizationId: number;
    macroprocess: OrganizationMacroprocess;
}
  
export class OrganizationItService {
    instanceId: number;
    id: number;
    name: string;
    relevance: RatingLevel;
    itAssets: OrganizationItAsset[] = [];
    
    organizationId: number;
    process: OrganizationProcess;
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