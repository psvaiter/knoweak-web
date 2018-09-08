import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgSelectModule } from '@ng-select/ng-select'

import { AppComponent } from './app.component';
import { AuthService } from './services/auth/auth.service';
import { CrudComponent } from './components/utils/crud/crud.component';
import { CrudService } from './components/utils/crud/crud.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DepartmentComponent } from './components/department/department.component';
import { EditDepartmentComponent } from './components/department/edit-department/edit-department.component';
import { MacroprocessComponent } from './components/macroprocess/macroprocess.component';
import { EditMacroprocessComponent } from './components/macroprocess/edit-macroprocess/edit-macroprocess.component';
import { ProcessComponent } from './components/process/process.component';
import { EditProcessComponent } from './components/process/edit-process/edit-process.component';
import { ItServiceComponent } from './components/it-service/it-service.component';
import { EditItServiceComponent } from './components/it-service/edit-it-service/edit-it-service.component';
import { ItAssetComponent } from './components/it-asset/it-asset.component';
import { EditItAssetComponent } from './components/it-asset/edit-it-asset/edit-it-asset.component';
import { SecurityThreatComponent } from './components/security-threat/security-threat.component';
import { EditSecurityThreatComponent } from './components/security-threat/edit-security-threat/edit-security-threat.component';
import { MitigationControlComponent } from './components/mitigation-control/mitigation-control.component';
import { EditMitigationControlComponent } from './components/mitigation-control/edit-mitigation-control/edit-mitigation-control.component';
import { UserComponent } from './components/user/user.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { EditOrganizationComponent } from './components/organization/edit-organization/edit-organization.component';
import { OrganizationStructureComponent } from './components/organization/organization-structure/organization-structure.component';
import { CallbackComponent } from './components/auth/callback/callback.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TokenInterceptorService } from './services/auth/token-interceptor.service';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { AnalysisDetailComponent } from './components/analysis/analysis-detail/analysis-detail.component';
import { EditAnalysisComponent } from './components/analysis/edit-analysis/edit-analysis.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CrudComponent,
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
    UserComponent,
    EditUserComponent,
    // OrganizationComponent,
    // EditOrganizationComponent,
    // OrganizationStructureComponent,
    CallbackComponent,
    PageNotFoundComponent,
    // AnalysisComponent,
    // AnalysisDetailComponent,
    // EditAnalysisComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    HttpClientModule,
    NgSelectModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    CrudService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
