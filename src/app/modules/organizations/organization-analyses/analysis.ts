export class Analysis {
    id: number;
    description: string;
    createdOn: Date;
    lastModifiedOn: Date;
    
    organizationId: number;
    details: AnalysisDetail[] = [];
}

export class AnalysisDetail {
    id: number;
    departmentName: string;
    macroprocessName: string;
    processName: string;
    processRelevance: number;
    itServiceName: string;
    itServiceRelevance: number;
    itAssetName: string;
    itAssetRelevance: number;
    itAssetVulnerabilityLevel: number;
    securityThreatName: string;
    securityThreatLevel: number;

    calculatedImpact: number;
    calculatedProbability: number;
    calculatedRisk: number;
}