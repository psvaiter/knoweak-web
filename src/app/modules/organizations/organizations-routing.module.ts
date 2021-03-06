import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationDetailsComponent } from './organization-details/organization-details.component';
import { OrganizationStructureComponent } from './organization-structure/organization-structure.component';
import { OrganizationAnalysesComponent } from './organization-analyses/organization-analyses.component';
import { OrganizationAnalysisDetailComponent } from './organization-analyses/organization-analysis-detail/organization-analysis-detail.component';
import { OrganizationSecurityThreatsComponent } from './organization-security-threats/organization-security-threats.component';
import { OrganizationItAssetsComponent } from './organization-it-assets/organization-it-assets.component';
import { OrganizationItAssetVulnerabilitiesComponent } from './organization-it-assets/organization-it-asset-vulnerabilities/organization-it-asset-vulnerabilities.component';
import { AuthGuardService } from '../../services/auth/auth-guard.service';

const routes: Routes = [
    { path: '', component: OrganizationListComponent },
    { path: ':id/details', component: OrganizationDetailsComponent },
    { path: ':id/structure', component: OrganizationStructureComponent },
    { path: ':id/securityThreats', component: OrganizationSecurityThreatsComponent },
    { path: ':id/itAssets', component: OrganizationItAssetsComponent },
    { path: ':id/itAssets/:instanceId/vulnerabilities', component: OrganizationItAssetVulnerabilitiesComponent },
    {
        path: ':id/analyses',
        component: OrganizationAnalysesComponent,
        canActivate: [AuthGuardService],
        data: { scope: 'read:analyses' }
    },
    { 
        path: ':id/analyses/:analysisId/details', 
        component: OrganizationAnalysisDetailComponent,
        canActivate: [AuthGuardService],
        data: { scope: 'read:analyses' }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationsRoutingModule { }
