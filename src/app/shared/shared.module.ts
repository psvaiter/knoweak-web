import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ModalModule } from 'ngx-bootstrap/modal';

import { AngularFontAwesomeModule } from "angular-font-awesome";
import { NgSelectModule } from "@ng-select/ng-select";

import { ErrorAlertComponent } from "./error-alert/error-alert.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { ModalComponent } from './modal/modal.component';

@NgModule({
    declarations: [
        ErrorAlertComponent,
        PaginationComponent,
        ModalComponent
    ],
    entryComponents: [
        ModalComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AngularFontAwesomeModule,
        NgSelectModule,
        ModalModule.forRoot(),
    ],
    exports: [
        CommonModule,
        FormsModule,
        AngularFontAwesomeModule,
        NgSelectModule,
        ErrorAlertComponent,
        PaginationComponent,
        ModalModule,
        ModalComponent
    ]
})
export class SharedModule {}