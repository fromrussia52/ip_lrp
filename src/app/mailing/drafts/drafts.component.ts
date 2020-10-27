import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

export interface MailingElement {
    title: string;
    desc: string;
    tag: string;
    state: string;
    sended: number;
    viewed: number;
    clicked: number;
    created: string;
    agent: string;
}

@Component({
    selector: 'mailing-drafts',
    templateUrl: './drafts.component.html',
    styleUrls: ['./drafts.component.scss']
})
export class DraftsComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ['select', 'name', 'created', 'btn'];
    dataSource = new MatTableDataSource<MailingElement>();
    selection = new SelectionModel<MailingElement>(true, []);
    dateFormat = {
        year: 'numeric', month: 'long', day: 'numeric'
    };

    constructor(
        private router: Router
    ) { }

    subscriptions: Subscription[] = [];

    ngOnInit() {
        this.dataSource.data = [
            { title: 'test', desc: 'qdqdkqwd qw', tag: 'face', state: 'Активна', sended: 123, viewed: 322, clicked: 212, created: Intl.DateTimeFormat([], this.dateFormat).format(Date.now()), agent: 'Carl Jenkins' }
        ];
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => {
            sub.unsubscribe();
        });
    }

    createMailing() {
        this.router.navigate(['/create'])
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    masterToggle() {
        this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
    }
}