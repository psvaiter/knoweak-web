import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CallbackComponent } from "./components/auth/callback/callback.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { UserComponent } from "./components/user/user.component";
import { EditUserComponent } from "./components/user/edit-user/edit-user.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { AuthGuardService } from "./services/auth/auth-guard.service";

const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'auth-callback', component: CallbackComponent },
    { path: 'dashboard', component: DashboardComponent },
    { 
        path: 'catalog', 
        loadChildren: 'app/modules/catalog/catalog.module#CatalogModule',
        canActivate: [AuthGuardService],
        data: { scope: 'read:catalog' }
    },
    { 
        path: 'organizations', 
        loadChildren: 'app/modules/organizations/organizations.module#OrganizationsModule', 
        canActivate: [AuthGuardService],
        data: { scope: 'read:organizations' }
    },
    { path: 'users', component: UserComponent },
    { path: 'users/:id/edit', component: EditUserComponent },
    { path: '**', component: PageNotFoundComponent }
]
  
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}