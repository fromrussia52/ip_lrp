import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { CreateComponent } from './create/create.component';
import { MailingService } from './mailing.service';
import { SendedComponent } from './sended/sended.component';
import { DraftsComponent } from './drafts/drafts.component';
import { CommonModule } from '@angular/common';

/**
 * material modules
 */
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

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
        CreateComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatIconModule,
        MatButtonModule,
        MatDividerModule
    ],
    providers: [
        MailingService
    ]
})
export class MailingModule { }
