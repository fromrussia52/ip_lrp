import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: '',
    redirectTo: '/sended',
    pathMatch: 'full'
}, {
    path: '',
    loadChildren: () => import('./mailing/mailing.module').then(m => m.MailingModule),
}, {
    path: '**',
    redirectTo: '/sended'
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
