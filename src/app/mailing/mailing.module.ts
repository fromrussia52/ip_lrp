import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { CreateComponent } from './create/create.component';
import { MailingService } from './mailing.service';
import { SendedComponent } from './sended/sended.component';
import { DraftsComponent } from './drafts/drafts.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/**
 * material modules
 */
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorComponent } from './create/editor/editor.component';
import { EditorDirective } from './create/editor/editor.directive';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';

const routes: Routes = [{
    path: '',
    redirectTo: 'sended',
    pathMatch: 'full'
}, {
    path: '',
    component: ContainerComponent,
    children: [{
        path: 'sended',
        component: SendedComponent
    }, {
        path: 'drafts',
        component: DraftsComponent
    }, {
        path: 'create',
        component: CreateComponent
    }]
}];

@NgModule({
    declarations: [
        ContainerComponent,
        SendedComponent,
        DraftsComponent,
        CreateComponent,
        EditorComponent,
        EditorDirective
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        MatIconModule,
        MatButtonModule,
        MatDividerModule,
        MatTableModule,
        MatCheckboxModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatMenuModule
    ],
    providers: [
        MailingService
    ]
})
export class MailingModule { }
