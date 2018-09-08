import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ErrorAlertComponent } from "./error-alert/error-alert.component";
import { PaginationComponent } from "./pagination/pagination.component";


@NgModule({
    declarations: [
        ErrorAlertComponent,
        PaginationComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CommonModule,
        ErrorAlertComponent,
        PaginationComponent
    ]
})
export class SharedModule {}