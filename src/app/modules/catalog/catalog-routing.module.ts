import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DepartmentComponent } from "./department/department.component";
import { EditDepartmentComponent } from "./department/edit-department/edit-department.component";
import { MacroprocessComponent } from "./macroprocess/macroprocess.component";
import { EditMacroprocessComponent } from "./macroprocess/edit-macroprocess/edit-macroprocess.component";
import { ProcessComponent } from "./process/process.component";
import { EditProcessComponent } from "./process/edit-process/edit-process.component";
import { ItServiceComponent } from "./it-service/it-service.component";
import { EditItServiceComponent } from "./it-service/edit-it-service/edit-it-service.component";
import { ItAssetComponent } from "./it-asset/it-asset.component";
import { EditItAssetComponent } from "./it-asset/edit-it-asset/edit-it-asset.component";
import { SecurityThreatComponent } from "./security-threat/security-threat.component";
import { EditSecurityThreatComponent } from "./security-threat/edit-security-threat/edit-security-threat.component";
import { MitigationControlComponent } from "./mitigation-control/mitigation-control.component";
import { EditMitigationControlComponent } from "./mitigation-control/edit-mitigation-control/edit-mitigation-control.component";

const routes: Routes = [
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
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CatalogRoutingModule {}