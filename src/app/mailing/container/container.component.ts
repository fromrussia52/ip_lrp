import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/internal/operators';

@Component({
    selector: 'mailing-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnDestroy {
    activeMenu: any = {
        sended: false,
        drafts: false
    }

    constructor(
        private router: Router
    ) {
        let subs_1$ = this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event: NavigationEnd) => {
            let partUrl = event.url === event.urlAfterRedirects ? event.url.split('/')[1].replace(/\?.*/, '') : event.urlAfterRedirects.split('/')[1].replace(/\?.*/, '');
            for (let i in this.activeMenu) {
                if (i === partUrl) {
                    this.activeMenu[i] = true;
                } else {
                    this.activeMenu[i] = false;
                }
            }
        });
        this.subscriptions.push(subs_1$);
    }

    subscriptions: Subscription[] = [];

    ngOnDestroy() {
        this.subscriptions.forEach(sub => {
            sub.unsubscribe();
        });
    }

    navigate(value) {
        this.router.navigate([value]);
    }
}