import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MailingService } from '../mailing.service';

@Component({
    selector: 'mailing-sended',
    templateUrl: './sended.component.html',
    styleUrls: ['./sended.component.scss']
})
export class SendedComponent implements OnDestroy {
    constructor(
        private router: Router
    ) { }

    subscriptions: Subscription[] = [];

    ngOnDestroy() {
        this.subscriptions.forEach(sub => {
            sub.unsubscribe();
        });
    }

    createMailing(){
        this.router.navigate(['/create'])
    }    
}