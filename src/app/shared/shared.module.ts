import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ErrorAlertComponent } from "./error-alert/error-alert.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { FormsModule } from "../../../node_modules/@angular/forms";
import { AngularFontAwesomeModule } from "../../../node_modules/angular-font-awesome";
import { NgSelectModule } from "../../../node_modules/@ng-select/ng-select";


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