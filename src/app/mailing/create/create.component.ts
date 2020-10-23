import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MailingService } from '../mailing.service';

@Component({
    selector: 'mailing-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnDestroy {
    constructor(
        private mailingService: MailingService
    ) { }

    subscriptions: Subscription[] = [];

    ngOnDestroy() {
        this.subscriptions.forEach(sub => {
            sub.unsubscribe();
        });
    }

    send() {
        const value = {};
        this.mailingService.send(value);
    }
}