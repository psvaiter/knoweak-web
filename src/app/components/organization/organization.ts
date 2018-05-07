class Organization {
    id: number;
    taxId: string;
    legalName: string;
    tradeName: string;
    createdOn: DateTimeFormat;
    lastModifiedOn: DateTimeFormat;
    departments: OrganizationDepartment[] = [];
}

class OrganizationDepartment {
    id: number;
    name: string;
    macroprocesses: OrganizationMacroprocess[] = [];
    expanded: boolean = false;
}
  
class OrganizationMacroprocess {
    id: number;
    name: string;
    processes: OrganizationProcess[] = [];
    expanded: boolean = false;
}
  
class OrganizationProcess {
    id: number;
    name: string;
    itServices: OrganizationItService[] = [];
    expanded: boolean = false;
}
  
class OrganizationItService {
    id: number;
    name: string;
    itAssets: OrganizationItAsset[] = [];
    expanded: boolean = false;
}
  
class OrganizationItAsset {
    id: number;
    name: string;
}
  