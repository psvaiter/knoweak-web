import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './services/auth/auth.service';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { CallbackComponent } from './components/auth/callback/callback.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TokenInterceptorService } from './services/auth/token-interceptor.service';
import { CrudService } from './shared/components/crud/crud.service';
import { CrudComponent } from './shared/components/crud/crud.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CrudComponent,
    UserComponent,
    EditUserComponent,
    CallbackComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    CrudService,
    AuthService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
