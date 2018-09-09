import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CallbackComponent } from "./components/auth/callback/callback.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { UserComponent } from "./components/user/user.component";
import { EditUserComponent } from "./components/user/edit-user/edit-user.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'auth-callback', component: CallbackComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'catalog', loadChildren: 'app/catalog/catalog.module#CatalogModule' },
    { path: 'organizations', loadChildren: 'app/organizations/organizations.module#OrganizationsModule', canActivate: [] },
    { path: 'users', component: UserComponent },
    { path: 'users/:id/edit', component: EditUserComponent },
    { path: '**', component: PageNotFoundComponent }
]
  
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}