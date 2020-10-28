import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MailingService } from '../mailing.service';

interface IData {
    title: string;
    tag: string;
    desc: string;
}

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
        private fb: FormBuilder,
        private activateRoute: ActivatedRoute
    ) {
        this.firstFormGroup = this.fb.group({
            desc: ['', [Validators.required]]
        });

        this.secondFormGroup = this.fb.group({
            title: ['', [Validators.required]],
            tag: ['', [Validators.required]]
        });

        let subs_$1 = this.activateRoute.params.subscribe(params => {
            if (params['number'] !== null) {
                this.getDraft(params['number']);
            }
        });
        this.subscriptions.push(subs_$1);
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
        if (this.firstFormGroup.invalid || this.secondFormGroup.invalid) {
            alert('Некорректно заполнена форма');
            return;
        }

        let value = { ...this.secondFormGroup.value, ...this.firstFormGroup.value };
        this.mailingService.send(value).subscribe(_ => {
            this.navigate('/sended');
        });
    }

    save() {
        let value = { ...this.secondFormGroup.value, ...this.firstFormGroup.value };
        this.mailingService.save(value).subscribe(_ => {
            this.navigate('/drafts');
        });
    }

    getDraft(index: number) {
        this.mailingService.getSaved(index).subscribe((data: IData) => {
            this.firstFormGroup.controls.desc.setValue(data.desc);
            this.secondFormGroup.controls.title.setValue(data.title);
            this.secondFormGroup.controls.tag.setValue(data.tag);
        });
    }
}