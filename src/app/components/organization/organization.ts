export class Organization {
    id: number;
    taxId: string;
    legalName: string;
    tradeName: string;
    createdOn: DateTimeFormat;
    lastModifiedOn: DateTimeFormat;
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
}
  
export class OrganizationProcess {
    instanceId: number;
    id: number;
    name: string;
    itServices: OrganizationItService[] = [];
    
    expanded: boolean = false;
    selectedItServiceId: number;
}
  
export class OrganizationItService {
    instanceId: number;
    id: number;
    name: string;
    itAssets: OrganizationItAsset[] = [];
    
    expanded: boolean = false;
    selectedItAssetIt: number;
}
  
export class OrganizationItAsset {
    instanceId: number;
    id: number;
    name: string;
}
