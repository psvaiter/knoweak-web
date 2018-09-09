import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AngularFontAwesomeModule } from "angular-font-awesome";
import { NgSelectModule } from "@ng-select/ng-select";

import { ErrorAlertComponent } from "./error-alert/error-alert.component";
import { PaginationComponent } from "./pagination/pagination.component";

@NgModule({
    declarations: [
        ErrorAlertComponent,
        PaginationComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AngularFontAwesomeModule,
        NgSelectModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        AngularFontAwesomeModule,
        NgSelectModule,
        ErrorAlertComponent,
        PaginationComponent
    ]
})
export class SharedModule {}