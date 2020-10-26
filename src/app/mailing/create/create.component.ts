import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MailingService } from '../mailing.service';

@Component({
    selector: 'mailing-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
    firstFormGroup: FormGroup = null;
    secondFormGroup: FormGroup = null;

    constructor(
        private mailingService: MailingService,
        private router: Router,
        private fb: FormBuilder
    ) {
        this.firstFormGroup = this.fb.group({
            desc: ['']
        });

        this.secondFormGroup = this.fb.group({
            title: [''],
            tag: ['']
        });
    }

    subscriptions: Subscription[] = [];

    ngOnInit() {
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => {
            sub.unsubscribe();
        });
    }

    navigate(value) {
        this.router.navigate([value]);
    }

    send() {
        const value = {};
        this.mailingService.send(value);
    }
}