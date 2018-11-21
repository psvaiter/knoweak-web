import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AngularFontAwesomeModule } from "angular-font-awesome";
import { NgSelectModule } from "@ng-select/ng-select";
import { ModalModule } from 'ngx-bootstrap/modal';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ErrorAlertComponent } from "./components/error-alert/error-alert.component";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { ModalComponent } from "./components/modal/modal.component";

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
        ButtonsModule.forRoot()
    ],
    exports: [
        CommonModule,
        FormsModule,
        AngularFontAwesomeModule,
        NgSelectModule,
        ErrorAlertComponent,
        PaginationComponent,
        ModalModule,
        ModalComponent,
        ButtonsModule
    ]
})
export class SharedModule {}