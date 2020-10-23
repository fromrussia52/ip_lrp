import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MailingService } from '../mailing.service';

@Component({
    selector: 'mailing-drafts',
    templateUrl: './drafts.component.html',
    styleUrls: ['./drafts.component.scss']
})
export class DraftsComponent implements OnDestroy {
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