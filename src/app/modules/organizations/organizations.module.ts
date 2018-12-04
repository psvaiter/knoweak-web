import { NgModule } from '@angular/core';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationDetailsComponent } from './organization-details/organization-details.component';
import { OrganizationStructureComponent } from '../organizations/organization-structure/organization-structure.component';
import { OrganizationModalComponent } from './organization-modal/organization-modal.component';
import { DepartmentsLookupModalComponent } from './organization-structure/departments-lookup-modal/departments-lookup-modal.component';
import { MacroprocessLookupModalComponent } from './organization-structure/macroprocess-lookup-modal/macroprocess-lookup-modal.component';
import { ProcessLookupModalComponent } from './organization-structure/process-lookup-modal/process-lookup-modal.component';
import { ItServiceLookupModalComponent } from './organization-structure/it-service-lookup-modal/it-service-lookup-modal.component';
import { ItAssetLookupModalComponent } from './organization-structure/it-asset-lookup-modal/it-asset-lookup-modal.component';
import { OrganizationSecurityThreatLookupComponent } from './organization-security-threats/organization-security-threat-lookup/organization-security-threat-lookup.component';
import { OrganizationItAssetLookupComponent } from './organization-it-assets/organization-it-asset-lookup/organization-it-asset-lookup.component';
import { OrganizationItAssetVulnerabilityLookupComponent } from './organization-it-assets/organization-it-asset-vulnerabilities/organization-it-asset-vulnerability-lookup/organization-it-asset-vulnerability-lookup.component';
import { DepartmentListComponent } from './organization-structure/department-list/department-list.component';
import { DepartmentItemComponent } from './organization-structure/department-item/department-item.component';
import { MacroprocessItemComponent } from './organization-structure/macroprocess-item/macroprocess-item.component';
import { ProcessItemComponent } from './organization-structure/process-item/process-item.component';
import { ItServiceItemComponent } from './organization-structure/it-service-item/it-service-item.component';
import { ItAssetItemComponent } from './organization-structure/it-asset-item/it-asset-item.component';
import { OrganizationSecurityThreatsComponent } from './organization-security-threats/organization-security-threats.component';
import { OrganizationItAssetsComponent } from './organization-it-assets/organization-it-assets.component';
import { OrganizationItAssetVulnerabilitiesComponent } from './organization-it-assets/organization-it-asset-vulnerabilities/organization-it-asset-vulnerabilities.component';
import { OrganizationAnalysesComponent } from './organization-analyses/organization-analyses.component';
import { AnalysisDetailComponent } from './organization-analyses/analysis-detail/analysis-detail.component';
import { EditAnalysisComponent } from './organization-analyses/edit-analysis/edit-analysis.component';

import { CatalogDepartmentService } from '../../services/api/catalog/department/catalog-department.service';
import { CatalogMacroprocessService } from '../../services/api/catalog/macroprocess/catalog-macroprocess.service';
import { CatalogProcessService } from '../../services/api/catalog/process/catalog-process.service';
import { CatalogItServiceService } from '../../services/api/catalog/it-service/catalog-it-service.service';
import { CatalogItAssetService } from '../../services/api/catalog/it-asset/catalog-it-asset.service';
import { CatalogSecurityThreatService } from '../../services/api/catalog/security-threat/catalog-security-threat.service';
import { OrganizationService } from '../../services/api/organization/organization.service';
import { OrganizationDepartmentService } from '../../services/api/organization/organization-department.service';
import { OrganizationMacroprocessService } from '../../services/api/organization/organization-macroprocess.service';
import { OrganizationProcessService } from '../../services/api/organization/organization-process.service';
import { OrganizationItServiceService } from '../../services/api/organization/organization-it-service.service';
import { OrganizationItAssetService } from '../../services/api/organization/organization-it-asset.service';
import { OrganizationSecurityThreatService } from '../../services/api/organization/organization-security-threat.service';
import { OrganizationItAssetVulnerabilityService } from '../../services/api/organization/organization-it-asset-vulnerability.service';
import { OrganizationItServiceItAssetService } from '../../services/api/organization/organization-it-service-it-asset.service';

@NgModule({
    declarations: [
        OrganizationListComponent,
        OrganizationDetailsComponent,
        OrganizationStructureComponent,
        OrganizationAnalysesComponent,
        AnalysisDetailComponent,
        EditAnalysisComponent,
        OrganizationModalComponent,
        DepartmentsLookupModalComponent,
        MacroprocessLookupModalComponent,
        ProcessLookupModalComponent,
        ItServiceLookupModalComponent,
        ItAssetLookupModalComponent,
        OrganizationSecurityThreatLookupComponent,
        DepartmentListComponent,
        DepartmentItemComponent,
        MacroprocessItemComponent,
        ProcessItemComponent,
        ItServiceItemComponent,
        ItAssetItemComponent,
        OrganizationSecurityThreatsComponent,
        OrganizationItAssetsComponent,
        OrganizationItAssetLookupComponent,
        OrganizationItAssetVulnerabilitiesComponent,
        OrganizationItAssetVulnerabilityLookupComponent
    ],
    entryComponents: [
        DepartmentsLookupModalComponent,
        MacroprocessLookupModalComponent,
        ProcessLookupModalComponent,
        ItServiceLookupModalComponent,
        ItAssetLookupModalComponent,
        OrganizationModalComponent,
        OrganizationSecurityThreatLookupComponent,
        OrganizationItAssetLookupComponent,
        OrganizationItAssetVulnerabilityLookupComponent
    ],
    imports: [
        OrganizationsRoutingModule,
        SharedModule
    ],
    exports: [],
    providers: [
        CatalogDepartmentService,
        CatalogMacroprocessService,
        CatalogProcessService,
        CatalogItServiceService,
        CatalogItAssetService,
        CatalogSecurityThreatService,
        OrganizationService,
        OrganizationDepartmentService,
        OrganizationMacroprocessService,
        OrganizationProcessService,
        OrganizationItServiceService,
        OrganizationItServiceItAssetService,
        OrganizationItAssetService,
        OrganizationSecurityThreatService,
        OrganizationItAssetVulnerabilityService
    ],
})
export class OrganizationsModule { }
