import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DepartmentComponent } from './components/department/department.component';
import { DepartmentService } from './components/department/department.service';
import { PaginationComponent } from './components/pagination/pagination.component';
import { EditDepartmentComponent } from './components/department/edit-department/edit-department.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'departments', component: DepartmentComponent },
  { path: 'departments/:id/edit', component: EditDepartmentComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DepartmentComponent,
    PaginationComponent,
    EditDepartmentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    HttpClientModule
  ],
  providers: [
    DepartmentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
