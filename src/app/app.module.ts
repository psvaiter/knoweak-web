import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select'

import { AppComponent } from './app.component';
import { AuthService } from './services/auth/auth.service';
import { CrudComponent } from './shared/crud/crud.component';
import { CrudService } from './shared/crud/crud.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DepartmentComponent } from './catalog/department/department.component';
import { EditDepartmentComponent } from './catalog/department/edit-department/edit-department.component';
import { MacroprocessComponent } from './catalog/macroprocess/macroprocess.component';
import { EditMacroprocessComponent } from './catalog/macroprocess/edit-macroprocess/edit-macroprocess.component';
import { ProcessComponent } from './catalog/process/process.component';
import { EditProcessComponent } from './catalog/process/edit-process/edit-process.component';
import { ItServiceComponent } from './catalog/it-service/it-service.component';
import { EditItServiceComponent } from './catalog/it-service/edit-it-service/edit-it-service.component';
import { ItAssetComponent } from './catalog/it-asset/it-asset.component';
import { EditItAssetComponent } from './catalog/it-asset/edit-it-asset/edit-it-asset.component';
import { SecurityThreatComponent } from './catalog/security-threat/security-threat.component';
import { EditSecurityThreatComponent } from './catalog/security-threat/edit-security-threat/edit-security-threat.component';
import { MitigationControlComponent } from './catalog/mitigation-control/mitigation-control.component';
import { EditMitigationControlComponent } from './catalog/mitigation-control/edit-mitigation-control/edit-mitigation-control.component';
import { UserComponent } from './components/user/user.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { CallbackComponent } from './components/auth/callback/callback.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TokenInterceptorService } from './services/auth/token-interceptor.service';
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
    CallbackComponent,
    PageNotFoundComponent,
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
