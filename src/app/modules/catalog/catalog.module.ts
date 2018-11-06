import { NgModule } from "@angular/core";

import { CatalogRoutingModule } from "./catalog-routing.module";
import { SharedModule } from "../shared/shared.module";
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

@NgModule({
    declarations: [
        DepartmentComponent,
        EditDepartmentComponent,
        MacroprocessComponent,
        EditMacroprocessComponent,
        ProcessComponent,
        EditProcessComponent,
        ItServiceComponent,
        EditItServiceComponent,
        ItAssetComponent,
        EditItAssetComponent,
        SecurityThreatComponent,
        EditSecurityThreatComponent,
        MitigationControlComponent,
        EditMitigationControlComponent,
    ],
    imports: [
        CatalogRoutingModule,
        SharedModule
    ]
})
export class CatalogModule {}