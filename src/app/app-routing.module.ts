import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CallbackComponent } from "./components/auth/callback/callback.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { DepartmentComponent } from "./components/department/department.component";
import { EditDepartmentComponent } from "./components/department/edit-department/edit-department.component";
import { MacroprocessComponent } from "./components/macroprocess/macroprocess.component";
import { EditMacroprocessComponent } from "./components/macroprocess/edit-macroprocess/edit-macroprocess.component";
import { ProcessComponent } from "./components/process/process.component";
import { EditProcessComponent } from "./components/process/edit-process/edit-process.component";
import { ItServiceComponent } from "./components/it-service/it-service.component";
import { EditItServiceComponent } from "./components/it-service/edit-it-service/edit-it-service.component";
import { ItAssetComponent } from "./components/it-asset/it-asset.component";
import { EditItAssetComponent } from "./components/it-asset/edit-it-asset/edit-it-asset.component";
import { SecurityThreatComponent } from "./components/security-threat/security-threat.component";
import { EditSecurityThreatComponent } from "./components/security-threat/edit-security-threat/edit-security-threat.component";
import { MitigationControlComponent } from "./components/mitigation-control/mitigation-control.component";
import { EditMitigationControlComponent } from "./components/mitigation-control/edit-mitigation-control/edit-mitigation-control.component";
import { UserComponent } from "./components/user/user.component";
import { EditUserComponent } from "./components/user/edit-user/edit-user.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'auth-callback', component: CallbackComponent },
    { path: 'dashboard', component: DashboardComponent },
    // { path: 'organizations', component: OrganizationComponent },
    // { path: 'organizations/:id/edit', component: EditOrganizationComponent },
    // { path: 'organizations/:id/structure', component: OrganizationStructureComponent },
    // { path: 'organizations/:id/analyses', component: AnalysisComponent },
    // { path: 'organizations/:id/analyses/:analysisId/details', component: EditAnalysisComponent },
    { path: 'organizations', loadChildren: 'app/organizations/organizations.module#OrganizationsModule', canActivate: [] },
    { path: 'departments', component: DepartmentComponent },
    { path: 'departments/:id/edit', component: EditDepartmentComponent },
    { path: 'macroprocesses', component: MacroprocessComponent },
    { path: 'macroprocesses/:id/edit', component: EditMacroprocessComponent },
    { path: 'processes', component: ProcessComponent },
    { path: 'processes/:id/edit', component: EditProcessComponent },
    { path: 'services', component: ItServiceComponent },
    { path: 'services/:id/edit', component: EditItServiceComponent },
    { path: 'assets', component: ItAssetComponent },
    { path: 'assets/:id/edit', component: EditItAssetComponent },
    { path: 'securityThreats', component: SecurityThreatComponent },
    { path: 'securityThreats/:id/edit', component: EditSecurityThreatComponent },
    { path: 'mitigationControls', component: MitigationControlComponent },
    { path: 'mitigationControls/:id/edit', component: EditMitigationControlComponent },
    { path: 'users', component: UserComponent },
    { path: 'users/:id/edit', component: EditUserComponent },
    { path: '**', component: PageNotFoundComponent }
  ]
  
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}